## 考点

### 两个分支 git 的 merge 和 rebase 啥区别

A - B (master)
\
 C (feature)
此时在 feature 上 git merge/rebase master,分别是以下两个结果
A - B (master)
\    \
 C - D (feature)

A - B (master)
\
 C' (feature)

### 假设同一个分支操作两个提交有冲突了(同事提交 b 我提交 c)
A - B (origin/develop)
\ \
 C -- D 我手动解决冲突 (HEAD, develop)  

A - B (origin/develop)
\
 C(我 git merge --abort) (HEAD, develop)  

A - B (origin/develop)
\
 C'(我 git merge --rebase) (HEAD, develop)  
