
Should we write a code for using syss.path inside our project? Like
import sys, os
sys.path.append ....

I have questions:

1) My user types are:

Visitor / Reader — Browse and read published articles.
Author — Submit manuscripts, upload revisions, cover letters, supplementary materials, track review status.
Reviewer — Review assigned manuscripts, submit feedback, annotated manuscripts, and optional revision instructions.
Editor-in-Chief — Oversee all submissions, review reviewers’ decisions, make final acceptance/rejection decisions.
Section Editor — Assign reviewers, recommend decisions to Editor-in-Chief.
Managing Editor — Oversee editorial workflow, ensure deadlines and guidelines are followed.
Guest Editor — Manage special issues or themed sections.
Copyeditor / Proofreader — Edit accepted manuscripts, ensure formatting and language standards.
Production Editor — Prepare publication-ready files (PDF, EPUB), manage final formatting.
Administrator — Manage users, roles, permissions, workflow configuration.
Technical Admin — Handle infrastructure, backups, security, server settings.
Finance / Payment Manager (new, if you integrate payments) — Manage invoices, payment confirmations, subscription records.

2) What is the content of admin.py that you proposed? Waht is role, permission, rolepermission,userrole, userprofile admin? What is the purpose of creating them? Are they all necessary? Are they enough or there must be others?