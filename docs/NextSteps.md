Next steps I can wire:
accounts app: custom User model, role enums, DRF permissions
JWT login endpoints under api/accounts/
Per-app urls.py mounted in core/settings/urls.py



What you need to do
Apply migrations:
$env:DJANGO_SETTINGS_MODULE='backend.core.settings.dev'
python backend/manage.py makemigrations
python backend/manage.py migrate
Create a superuser:
python backend/manage.py createsuperuser
Run server:
python backend/manage.py runserver
Visit: http://127.0.0.1:8000/admin/
Model registrations added
backend/apps/users/admin.py: Registers custom User with a proper UserAdmin.
backend/apps/manuscripts/admin.py: Registers Manuscript, ManuscriptVersion, ManuscriptStatusHistory, EditorAssignment, Decision.
backend/apps/reviews/admin.py: Registers ReviewRound, Review, ReviewAssignment, ReviewFile, ReviewComment, ReviewRating.
backend/core/admin.py: Sets admin site titles.
Production considerations
Set DEBUG=False and set ALLOWED_HOSTS.
Collect static files:
python backend/manage.py collectstatic
Configure a static files server (e.g., Nginx) to serve STATIC_ROOT.
Secure admin with strong passwords, HTTPS, and possibly IP allowlists.
Optional improvements
Add search, filters, and list displays (already included for key models).
Register any additional models you want visible in admin.
Create custom admin actions for bulk operations.
Summary:
Admin is configured and URLs are wired.
I registered your main models for immediate use in /admin.
Next: run migrations, create a superuser, and log in.

rbac/object-permissions: if you need per-object access, consider django-guardian or a dedicated roles app.



cd backend
pip install -r requirements.txt
python manage.py makemigrations --settings=backend.core.settings.dev
python manage.py migrate --settings=backend.core.settings.dev
python manage.py createsuperuser --settings=backend.core.settings.dev
python manage.py runserver --settings=backend.core.settings.dev
Login options:
Admin UI: open http://127.0.0.1:8000/admin and sign in with the superuser you created.
API (JWT):
POST http://127.0.0.1:8000/api/users/token/
Body:
{ "username": "YOUR_ADMIN_USERNAME", "password": "YOUR_PASSWORD" }
Use the returned access token as: Authorization: Bearer <access>


Academic Journal Submission Workflow (Author Side)

Manuscript Preparation

Follow the journal’s formatting guidelines (Word/LaTeX templates, reference style, figures, tables).

Ensure ethics compliance (plagiarism check, authorship agreement, conflict of interest disclosure).

Manuscript Submission (Online Portal)

Register/login to the journal’s submission system.

Upload manuscript files (main text, figures, supplementary data).

Enter metadata: title, abstract, keywords, authors & affiliations.

Select article type, suggested reviewers, cover letter, funding info, etc.

Finalize submission → system assigns a manuscript ID.

Initial Editorial Screening

The Editor-in-Chief (EiC) or handling editor checks:

Scope fit (is it relevant for the journal?)

Quality & formatting

Plagiarism check (Turnitin, iThenticate)

Decision: desk reject (if unsuitable) or send to review.

Peer Review Process

The editor sends the manuscript to 2–4 reviewers.

Reviewers evaluate originality, methodology, clarity, contribution.

Provide feedback & recommendation:

Accept as is

Minor revision

Major revision

Reject

Editorial Decision

Based on reviewer reports, the editor makes a decision:

Revise (major/minor) → authors resubmit with response letter.

Reject → process ends.

Accept → moves to production.

Revision & Resubmission (if required)

Authors address reviewer comments.

Upload revised manuscript + detailed response to reviewers.

Possible multiple rounds until acceptance.

Final Acceptance

The editor confirms the paper is ready for publication.

Acceptance letter sent to authors.

Production & Proofing

Copyediting, typesetting, formatting in journal style.

Proof sent to authors for correction (typos, formatting issues).

Publication

Article published online (early access) and later in a specific journal issue.

DOI assigned, indexed in databases (Scopus, Web of Science, PubMed, etc.).

✅ Correct Phase Order (Simplified):
Preparation → Submission → Editorial Screening → Peer Review → Revision → Acceptance → Proofing → Publication

Do you want me to also make a diagram/flowchart of this process (like a visual submission workflow you could use in a presentation or documentation)?


Create a new dashboard. In this dashboard, every user role might see different options or informations. Lets go with the author and then we can go with editor. In dashboard, user can use the menu which is sit on the left side of the site and see the selected page. Author;
1) Can see the role, can access personal information, can add research fields
2) Can see the draft that send newly and have access to edit it if allowed and also status of the document (are available in the project)
3) Can see published manuscripts (just the general info and all the details must be visible when using a dropdown button).
4) Can see all the reviewers decide individually
5) Can see their tasks if assigned any (like editor of a journal, reviewer of a paper)
6) Can see total published manuscript number and total review
7) 