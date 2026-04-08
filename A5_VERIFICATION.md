# A5 verification matrix (`grading.txt`)

Use this document to confirm **every scored criterion** before submission. Check **Local** when verified on `localhost`; check **Remote** when verified on Vercel + Render (or your hosts).

**Prerequisites (local):**

1. Terminal A: `cd kambaz-node-server-app && npm start` (API on port **4000** by default).
2. Terminal B: `cd kambaz-next-js && npm run dev` (Next on **3000**).
3. Run API smoke test: `./scripts/verify-a5-labs.sh` (from repo root).

---

## Labs — REST / Lab 5 UI

| Criterion | Local | Remote | How to verify |
|-----------|-------|--------|----------------|
| Path Parameters — Add 34 + 23 | [ ] | [ ] | Open `/labs/lab5`; defaults **34** / **23**; click **Add** (`#wd-path-parameter-add`); new tab shows **57**. |
| Path Parameters — Subtract 34 − 23 | [ ] | [ ] | Click **Subtract** (`#wd-path-parameter-subtract`); shows **11**. |
| Path Parameters — multiply (×2 rows in rubric) | [ ] | [ ] | Click **Multiply** / **Divide** (`#wd-path-parameter-multiply`, `#wd-path-parameter-divide`); responses match calculator. |
| Path Parameters — divide | [ ] | [ ] | Same as above. |
| Query Parameters — Add / Subtract 34 & 23 | [ ] | [ ] | Query section: `#wd-query-parameter-add` / `#wd-query-parameter-subtract`; results **57** / **11**. |
| Query Parameters — multiply / divide | [ ] | [ ] | `#wd-query-parameter-multiply`, `#wd-query-parameter-divide`. |
| Working with Objects — Get Assignment / Title / Update Title | [ ] | [ ] | Use link list in **Working With Objects**; update title via links + inputs as needed. |
| Working with Objects — Get Module / Get Module Name | [ ] | [ ] | Same section; module links. |
| Working with Arrays — Get Todos / By Id / Completed / Create / Delete id 1 / Update title to NodeJS Assignment | [ ] | [ ] | **Working With Arrays** (link-based); exercise each link; for title update use path with `NodeJS%20Assignment` or equivalent. |
| Asynch — Fetching Welcome (×2 rubric lines) | [ ] | [ ] | **HTTP Client**: `#wd-fetch-welcome` (click); `#wd-fetch-welcome-on-load` fills after load (see **Requesting on Load**). |
| Asynch — Edit assignment title (async) | [ ] | [ ] | **Working With Objects Asynchronously**; change title; **Update Title**. |
| Asynch — Renders todos / delete / create / POST / DELETE / PUT | [ ] | [ ] | **Working With Arrays Asynchronously**: confirm `#wd-async-todos-list` shows rows after load; `#wd-post-todo`, `#wd-delete-todo-<id>`, `#wd-put-todo-<id>`. |
| Errors — DELETE todo 1234 | [ ] | [ ] | Call `DELETE /lab5/todos/1234` (script covers this); optional: trigger failing delete in UI and see `#wd-todo-error-message`. |

---

## Kambaz — Account & session

| Criterion | Local | Remote | How to verify |
|-----------|-------|--------|----------------|
| Sign in `iron_man` / `stark123` | [ ] | [ ] | `/account/signin`; must reach **Dashboard**. |
| Create new account | [ ] | [ ] | `/account/signup`; unique username; lands on profile. |
| Login with new account | [ ] | [ ] | Sign out; sign in with new credentials. |
| Update profile | [ ] | [ ] | Change a field (e.g. first name); **Update**; see success / updated fields. |
| Logout → login again → updates persist | [ ] | [ ] | Sign out; sign in; profile shows saved data. |
| Reload browser, still logged in | [ ] | [ ] | While logged in, **hard refresh** (Cmd+Shift+R); still authenticated. |
| Sign out | [ ] | [ ] | **Sign out** on profile; redirected to sign-in. |
| Session — login from 2 different browsers | [ ] | [ ] | e.g. Chrome + Firefox (or normal + private window **as separate browsers**); each logs in independently without breaking the other session. |

---

## Kambaz — Courses (Dashboard)

| Criterion | Local | Remote | How to verify |
|-----------|-------|--------|----------------|
| Dashboard loads courses from server | [ ] | [ ] | After sign-in as faculty (`iron_man`), **Published Courses** lists courses. |
| Add course — persists after refresh | [ ] | [ ] | **Add** new course; **refresh** page; course still listed. |
| Delete course — persists after refresh | [ ] | [ ] | **Delete** a disposable course; refresh; gone. |
| Update course | [ ] | [ ] | **Edit** / **Update** flow per UI; refresh; changes remain. |

---

## Kambaz — Modules

| Criterion | Local | Remote | How to verify |
|-----------|-------|--------|----------------|
| Navigate to course → modules populate | [ ] | [ ] | Dashboard → open a course → **Modules** (or home shows modules). |
| Create module | [ ] | [ ] | Add module name; save; appears in list. |
| Remove module | [ ] | [ ] | Delete module for current course. |
| Update module — survives refresh | [ ] | [ ] | Edit module; **refresh**; changes persist. |

---

## Kambaz — Assignments

| Criterion | Local | Remote | How to verify |
|-----------|-------|--------|----------------|
| Create assignment for course | [ ] | [ ] | Course → **Assignments** → add assignment; appears in list. |
| Retrieve assignments for course | [ ] | [ ] | List loads for selected course. |
| Update assignment | [ ] | [ ] | Open editor; save; refresh if needed. |
| Delete assignment | [ ] | [ ] | Delete; removed from list. |

---

## Kambaz — Enrollments

| Criterion | Local | Remote | How to verify |
|-----------|-------|--------|----------------|
| Enroll in a course | [ ] | [ ] | As **student** user: **Enrollments** toggle on dashboard; **Enroll** on a course. |
| Unenroll | [ ] | [ ] | **Unenroll**; enrollment removed. |
| Dashboard shows enrolled courses for user | [ ] | [ ] | **My Courses** / enrolled view lists only enrolled courses. |
| Enrollments persist while server runs | [ ] | [ ] | Refresh after enroll; still enrolled (in-memory DB until restart). |

---

## Rubric rows with “No Marks”

| Criterion | Notes |
|-----------|--------|
| Kambaz — Works Remotely | Optional smoke: sign-in, dashboard, `/labs/lab5` todos on deployed URLs. |
| Labs — Work Remotely | Same; confirm `NEXT_PUBLIC_HTTP_SERVER` points to **https** API with **no trailing slash**. |

---

## Sign-off

- [ ] `./scripts/verify-a5-labs.sh` passes against local API.
- [ ] `./scripts/verify-a5-labs.sh https://your-api.onrender.com` passes (remote).
- [ ] All tables above checked for **Local** (minimum).
- [ ] **Remote** checked before Canvas submission if graders use deployment.
