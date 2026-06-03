# STRIDE Threat Modeling Report
 Application Name: App_Final
 Course: Application Security

---

Threat Identification

| Threat Type | Description | Example in App | Mitigation |
|-------------|-------------|----------------|------------|
| Spoofing | Impersonating another user | Login without verification | JWT with signature, bcrypt hashing |
| Tampering | Modifying data in transit or storage | Changing data in DB via API | HTTPS, input validation, AES encryption |
| Repudiation | Denying actions performed | No logs for user actions | Enable logging, audit trails |
| Information Disclosure | Leaking sensitive data | Exposing password in error | Generic errors, AES encryption, output sanitization |
| Denial of Service | Making app unavailable | Spamming login or signup | Rate limiting 100 req/15min |
| Elevation of Privilege | Gaining unauthorized access | User accessing admin panel | Role-based access control middleware |git add .