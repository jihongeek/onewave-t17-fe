'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Lightbulb,
  Users,
  Clock,
  Settings,
  Bell,
  Edit3,
  Loader2,
  KeyRound,
  Trash2,
  AlertTriangle,
  LogOut,
} from 'lucide-react';
import {
  useAuth,
  updateMe,
  deleteMe,
  requestPasswordChangeEmail,
  changePassword,
} from '@/lib/auth';
import type { Gender, UpdateUserRequest } from '@/lib/auth';

// TODO: 아이디어, 프로젝트, 활동 API가 생기면 실제 데이터로 교체
const MOCK_IDEAS = [
  {
    id: '1',
    title: 'AI 헬스케어 챗봇',
    score: 87,
    upvotes: 142,
    status: 'active' as const,
    createdAt: '2일 전',
  },
  {
    id: '2',
    title: '스마트 다이어트 관리 앱',
    score: 72,
    upvotes: 56,
    status: 'active' as const,
    createdAt: '1주일 전',
  },
];

const MOCK_PROJECTS = [
  {
    id: 'p1',
    title: '프리랜서 세금 계산기',
    role: '프론트엔드',
    owner: '이지연',
    members: 4,
  },
];

const MOCK_ACTIVITIES = [
  {
    id: 'a1',
    text: 'AI 헬스케어 챗봇에 새 댓글이 달렸습니다.',
    time: '1시간 전',
  },
  {
    id: 'a2',
    text: '프리랜서 세금 계산기 팀 참여 요청이 승인되었습니다.',
    time: '3시간 전',
  },
];

export default function MyPage() {
  const router = useRouter();
  const {
    user,
    isLoggedIn,
    isLoading: authLoading,
    refreshUser,
    logout,
  } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 프로필 수정 폼
  const [editForm, setEditForm] = useState<UpdateUserRequest>({
    name: '',
    birthDate: '',
    gender: undefined,
  });

  // 비밀번호 변경 상태
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwordStep, setPasswordStep] = useState<'request' | 'verify'>(
    'request'
  );
  const [passwordForm, setPasswordForm] = useState({
    code: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  // 계정 삭제 상태
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // 사용자 정보가 로드되면 폼 초기화
  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || '',
        birthDate: user.birthDate || '',
        gender: user.gender,
      });
    }
  }, [user]);

  // 로그인 안 되어 있으면 리다이렉트
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.push('/');
    }
  }, [authLoading, isLoggedIn, router]);

  // 프로필 저장
  const handleSaveProfile = async () => {
    setIsSaving(true);
    setError(null);

    try {
      await updateMe(editForm);
      await refreshUser();
      setIsEditing(false);
      setSuccessMessage('프로필이 저장되었습니다.');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '프로필 저장에 실패했습니다.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  // 비밀번호 변경 이메일 요청
  const handleRequestPasswordEmail = async () => {
    setIsPasswordLoading(true);
    setError(null);

    try {
      await requestPasswordChangeEmail();
      setPasswordStep('verify');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '이메일 전송에 실패했습니다.'
      );
    } finally {
      setIsPasswordLoading(false);
    }
  };

  // 비밀번호 변경
  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    setIsPasswordLoading(true);
    setError(null);

    try {
      await changePassword({
        code: passwordForm.code,
        newPassword: passwordForm.newPassword,
      });
      setPasswordDialogOpen(false);
      setPasswordStep('request');
      setPasswordForm({ code: '', newPassword: '', confirmPassword: '' });
      setSuccessMessage('비밀번호가 변경되었습니다.');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '비밀번호 변경에 실패했습니다.'
      );
    } finally {
      setIsPasswordLoading(false);
    }
  };

  // 계정 삭제
  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await deleteMe();
      logout();
      router.push('/');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '계정 삭제에 실패했습니다.'
      );
      setIsDeleting(false);
    }
  };

  // 로딩 중
  if (authLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  // 로그인 안 됨
  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-secondary px-4 py-8 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-5xl">
          {/* 성공/에러 메시지 */}
          {successMessage && (
            <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
              {successMessage}
            </div>
          )}
          {error && (
            <div className="mb-4 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* 프로필 헤더 */}
          <div className="mb-8 flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-8 md:flex-row md:items-start">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-foreground">
                {user.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
              {user.birthDate && (
                <p className="text-xs text-muted-foreground">
                  생년월일: {user.birthDate}
                </p>
              )}
              {user.gender && (
                <Badge variant="secondary" className="mt-2">
                  {user.gender === 'MALE'
                    ? '남성'
                    : user.gender === 'FEMALE'
                      ? '여성'
                      : '기타'}
                </Badge>
              )}
              <div className="mt-4 flex flex-wrap justify-center gap-6 md:justify-start">
                <div className="flex items-center gap-2 text-sm">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">아이디어</span>
                  <span className="font-semibold text-foreground">
                    {MOCK_IDEAS.length}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">프로젝트</span>
                  <span className="font-semibold text-foreground">
                    {MOCK_PROJECTS.length}
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit3 className="mr-1.5 h-4 w-4" />
              {isEditing ? '취소' : '프로필 수정'}
            </Button>
          </div>

          {/* 프로필 수정 폼 */}
          {isEditing && (
            <div className="mb-8 rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                프로필 수정
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-name">이름</Label>
                  <Input
                    id="edit-name"
                    value={editForm.name}
                    onChange={e =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-birthdate">생년월일</Label>
                  <Input
                    id="edit-birthdate"
                    type="date"
                    value={editForm.birthDate}
                    onChange={e =>
                      setEditForm({ ...editForm, birthDate: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-gender">성별</Label>
                  <Select
                    value={editForm.gender || ''}
                    onValueChange={(value: Gender) =>
                      setEditForm({ ...editForm, gender: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="성별 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">남성</SelectItem>
                      <SelectItem value="FEMALE">여성</SelectItem>
                      <SelectItem value="OTHER">기타</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                >
                  취소
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      저장 중...
                    </>
                  ) : (
                    '저장'
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* 탭 */}
          <Tabs defaultValue="ideas" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-4">
              <TabsTrigger value="ideas">
                <Lightbulb className="mr-1.5 h-4 w-4" />
                <span className="hidden sm:inline">내 아이디어</span>
              </TabsTrigger>
              <TabsTrigger value="projects">
                <Users className="mr-1.5 h-4 w-4" />
                <span className="hidden sm:inline">프로젝트</span>
              </TabsTrigger>
              <TabsTrigger value="activity">
                <Clock className="mr-1.5 h-4 w-4" />
                <span className="hidden sm:inline">활동</span>
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="mr-1.5 h-4 w-4" />
                <span className="hidden sm:inline">설정</span>
              </TabsTrigger>
            </TabsList>

            {/* 아이디어 탭 */}
            <TabsContent value="ideas">
              <div className="flex flex-col gap-3">
                {MOCK_IDEAS.length === 0 ? (
                  <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
                    아직 등록한 아이디어가 없습니다.
                  </div>
                ) : (
                  MOCK_IDEAS.map(idea => (
                    <div
                      key={idea.id}
                      className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/20 hover:shadow-sm"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                        <span className="text-lg font-bold text-primary">
                          {idea.score}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-foreground">
                          {idea.title}
                        </h3>
                        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{idea.createdAt}</span>
                        </div>
                      </div>
                      <Badge
                        variant={
                          idea.status === 'active' ? 'default' : 'secondary'
                        }
                        className="text-xs"
                      >
                        {idea.status === 'active' ? '진행중' : '완료'}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            {/* 프로젝트 탭 */}
            <TabsContent value="projects">
              <div className="flex flex-col gap-3">
                {MOCK_PROJECTS.length === 0 ? (
                  <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
                    참여 중인 프로젝트가 없습니다.
                  </div>
                ) : (
                  MOCK_PROJECTS.map(project => (
                    <div
                      key={project.id}
                      className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-foreground">
                          {project.title}
                        </h3>
                        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                          <span>역할: {project.role}</span>
                          <span>|</span>
                          <span>리더: {project.owner}</span>
                          <span>|</span>
                          <span>{project.members}명</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            {/* 활동 탭 */}
            <TabsContent value="activity">
              <div className="flex flex-col gap-3">
                {MOCK_ACTIVITIES.length === 0 ? (
                  <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
                    아직 활동 기록이 없습니다.
                  </div>
                ) : (
                  MOCK_ACTIVITIES.map(activity => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                    >
                      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                        <Bell className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">
                          {activity.text}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            {/* 설정 탭 */}
            <TabsContent value="settings">
              <div className="space-y-6">
                {/* 알림 설정 */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h2 className="mb-6 text-lg font-semibold text-foreground">
                    알림 설정
                  </h2>
                  <div className="flex flex-col gap-5">
                    {[
                      {
                        title: '댓글 알림',
                        desc: '내 아이디어에 댓글이 달리면 알림을 받습니다.',
                      },
                      {
                        title: '업보트 알림',
                        desc: '내 아이디어가 업보트를 받으면 알림을 받습니다.',
                      },
                      {
                        title: '팀 알림',
                        desc: '팀 참여 요청 및 승인에 대한 알림을 받습니다.',
                      },
                    ].map((setting, idx) => (
                      <div
                        key={setting.title}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <h3 className="text-sm font-medium text-foreground">
                            {setting.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {setting.desc}
                          </p>
                        </div>
                        <Switch defaultChecked={idx < 2} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 보안 설정 */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h2 className="mb-6 text-lg font-semibold text-foreground">
                    보안 설정
                  </h2>
                  <div className="flex flex-col gap-4">
                    {/* 비밀번호 변경 */}
                    <Dialog
                      open={passwordDialogOpen}
                      onOpenChange={setPasswordDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <KeyRound className="mr-2 h-4 w-4" />
                          비밀번호 변경
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>비밀번호 변경</DialogTitle>
                          <DialogDescription>
                            {passwordStep === 'request'
                              ? '이메일로 인증 코드를 전송합니다.'
                              : '인증 코드와 새 비밀번호를 입력하세요.'}
                          </DialogDescription>
                        </DialogHeader>

                        {passwordStep === 'request' ? (
                          <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                              {user.email}로 인증 코드가 전송됩니다.
                            </p>
                            {error && (
                              <p className="text-sm text-destructive">
                                {error}
                              </p>
                            )}
                            <Button
                              onClick={handleRequestPasswordEmail}
                              disabled={isPasswordLoading}
                              className="w-full"
                            >
                              {isPasswordLoading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  전송 중...
                                </>
                              ) : (
                                '인증 코드 전송'
                              )}
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="password-code">인증 코드</Label>
                              <Input
                                id="password-code"
                                value={passwordForm.code}
                                onChange={e =>
                                  setPasswordForm({
                                    ...passwordForm,
                                    code: e.target.value,
                                  })
                                }
                                placeholder="이메일로 받은 코드 입력"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="new-password">새 비밀번호</Label>
                              <Input
                                id="new-password"
                                type="password"
                                value={passwordForm.newPassword}
                                onChange={e =>
                                  setPasswordForm({
                                    ...passwordForm,
                                    newPassword: e.target.value,
                                  })
                                }
                                placeholder="6자 이상"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="confirm-password">
                                비밀번호 확인
                              </Label>
                              <Input
                                id="confirm-password"
                                type="password"
                                value={passwordForm.confirmPassword}
                                onChange={e =>
                                  setPasswordForm({
                                    ...passwordForm,
                                    confirmPassword: e.target.value,
                                  })
                                }
                                placeholder="비밀번호 다시 입력"
                              />
                            </div>
                            {error && (
                              <p className="text-sm text-destructive">
                                {error}
                              </p>
                            )}
                            <Button
                              onClick={handleChangePassword}
                              disabled={isPasswordLoading}
                              className="w-full"
                            >
                              {isPasswordLoading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  변경 중...
                                </>
                              ) : (
                                '비밀번호 변경'
                              )}
                            </Button>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    {/* 계정 삭제 */}
                    <Dialog
                      open={deleteDialogOpen}
                      onOpenChange={setDeleteDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          계정 삭제
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2 text-destructive">
                            <AlertTriangle className="h-5 w-5" />
                            계정 삭제
                          </DialogTitle>
                          <DialogDescription>
                            정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수
                            없습니다. 모든 데이터가 영구적으로 삭제됩니다.
                          </DialogDescription>
                        </DialogHeader>
                        {error && (
                          <p className="text-sm text-destructive">{error}</p>
                        )}
                        <DialogFooter className="gap-2 sm:gap-0">
                          <Button
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                          >
                            취소
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={handleDeleteAccount}
                            disabled={isDeleting}
                          >
                            {isDeleting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                삭제 중...
                              </>
                            ) : (
                              '계정 삭제'
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    {/* 로그아웃 */}
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        logout();
                        router.push('/');
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      로그아웃
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
