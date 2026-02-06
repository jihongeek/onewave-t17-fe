'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogIn, Loader2, Eye, EyeOff } from 'lucide-react';
import {
  useAuth,
  login,
  requestSignupEmail,
  verifySignupEmail,
  signup,
} from '@/lib/auth';

interface AuthModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
}

interface AuthModalContextValue {
  open: boolean;
  openModal: () => void;
  setOpen: (open: boolean) => void;
}

const AuthModalContext = createContext<AuthModalContextValue | undefined>(
  undefined
);

function AuthModal({ open, onOpenChange, hideTrigger }: AuthModalProps) {
  const { login: authLogin } = useAuth();
  const [internalOpen, setInternalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const isControlled = open !== undefined && onOpenChange !== undefined;
  const dialogOpen = isControlled ? open : internalOpen;
  const setDialogOpen = isControlled ? onOpenChange : setInternalOpen;

  // 로그인 폼 상태
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // 회원가입 폼 상태
  const [signupForm, setSignupForm] = useState({
    email: '',
    password: '',
    name: '',
    verificationCode: '',
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);

  // 폼 초기화
  const resetForms = () => {
    setLoginForm({ email: '', password: '' });
    setSignupForm({ email: '', password: '', name: '', verificationCode: '' });
    setIsEmailVerified(false);
    setIsCodeSent(false);
    setError(null);
    setSuccessMessage(null);
  };

  // 로그인 처리
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await login(loginForm);
      await authLogin(response.accessToken);
      setDialogOpen(false);
      resetForms();
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 이메일 인증 코드 요청
  const handleRequestCode = async () => {
    if (!signupForm.email) {
      setError('이메일을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await requestSignupEmail({ email: signupForm.email });
      setIsCodeSent(true);
      setSuccessMessage(response.message || '인증 코드가 전송되었습니다.');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '인증 코드 전송에 실패했습니다.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 이메일 인증 코드 확인
  const handleVerifyCode = async () => {
    if (!signupForm.verificationCode) {
      setError('인증 코드를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await verifySignupEmail({
        email: signupForm.email,
        code: signupForm.verificationCode,
      });
      setIsEmailVerified(true);
      setSuccessMessage('이메일 인증이 완료되었습니다.');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '인증 코드가 올바르지 않습니다.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 회원가입 처리
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEmailVerified) {
      setError('이메일 인증을 먼저 완료해주세요.');
      return;
    }

    if (signupForm.password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await signup({
        email: signupForm.email,
        password: signupForm.password,
        name: signupForm.name,
      });

      // 회원가입 성공 후 로그인 탭으로 전환
      setActiveTab('login');
      setLoginForm({ email: signupForm.email, password: '' });
      setSignupForm({
        email: '',
        password: '',
        name: '',
        verificationCode: '',
      });
      setIsEmailVerified(false);
      setIsCodeSent(false);
      setSuccessMessage('회원가입이 완료되었습니다. 로그인해주세요.');
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 탭 전환 시 에러 초기화
  const handleTabChange = (value: string) => {
    setActiveTab(value as 'login' | 'signup');
    setError(null);
    setSuccessMessage(null);
  };

  // 다이얼로그 열기/닫기 핸들러
  const handleOpenChange = (isOpen: boolean) => {
    setDialogOpen(isOpen);
    if (!isOpen) {
      resetForms();
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      {!hideTrigger && (
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <LogIn className="mr-1.5 h-4 w-4" />
            로그인
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>환영합니다!</DialogTitle>
          <DialogDescription>
            Mavis에 로그인하거나 새 계정을 만들어보세요.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">로그인</TabsTrigger>
            <TabsTrigger value="signup">회원가입</TabsTrigger>
          </TabsList>

          {/* 로그인 탭 */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">이메일</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="example@email.com"
                  value={loginForm.email}
                  onChange={e =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">비밀번호</Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호를 입력하세요"
                    value={loginForm.password}
                    onChange={e =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}
              {successMessage && (
                <p className="text-sm text-green-600">{successMessage}</p>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    로그인 중...
                  </>
                ) : (
                  '로그인'
                )}
              </Button>
            </form>
          </TabsContent>

          {/* 회원가입 탭 */}
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">이름</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={signupForm.name}
                  onChange={e =>
                    setSignupForm({ ...signupForm, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">이메일</Label>
                <div className="flex gap-2">
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="example@email.com"
                    value={signupForm.email}
                    onChange={e =>
                      setSignupForm({ ...signupForm, email: e.target.value })
                    }
                    disabled={isEmailVerified}
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRequestCode}
                    disabled={isLoading || isEmailVerified || !signupForm.email}
                    className="shrink-0"
                  >
                    {isLoading && !isCodeSent ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : isCodeSent ? (
                      '재전송'
                    ) : (
                      '인증'
                    )}
                  </Button>
                </div>
              </div>

              {isCodeSent && !isEmailVerified && (
                <div className="space-y-2">
                  <Label htmlFor="verification-code">인증 코드</Label>
                  <div className="flex gap-2">
                    <Input
                      id="verification-code"
                      type="text"
                      placeholder="인증 코드 입력"
                      value={signupForm.verificationCode}
                      onChange={e =>
                        setSignupForm({
                          ...signupForm,
                          verificationCode: e.target.value,
                        })
                      }
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleVerifyCode}
                      disabled={isLoading || !signupForm.verificationCode}
                      className="shrink-0"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        '확인'
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {isEmailVerified && (
                <p className="text-sm text-green-600">
                  ✓ 이메일 인증이 완료되었습니다.
                </p>
              )}

              <div className="space-y-2">
                <Label htmlFor="signup-password">비밀번호</Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="6자 이상 입력하세요"
                    value={signupForm.password}
                    onChange={e =>
                      setSignupForm({ ...signupForm, password: e.target.value })
                    }
                    minLength={6}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}
              {successMessage && !isEmailVerified && (
                <p className="text-sm text-green-600">{successMessage}</p>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !isEmailVerified}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    가입 중...
                  </>
                ) : (
                  '회원가입'
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const value = useMemo(
    () => ({
      open,
      setOpen,
      openModal,
    }),
    [open, openModal]
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      <AuthModal open={open} onOpenChange={setOpen} hideTrigger />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within AuthModalProvider');
  }
  return context;
}

export function AuthModalButton() {
  const { openModal } = useAuthModal();
  return (
    <Button variant="ghost" size="sm" onClick={openModal}>
      <LogIn className="mr-1.5 h-4 w-4" />
      로그인
    </Button>
  );
}
