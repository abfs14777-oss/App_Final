# DREAD Risk Assessment Report
## Application Name: App_Final
## Course: Application Security

---

## Risk Matrix

| Threat | D | R | E | A | D | Total (Max 50) | Risk Level |
|--------|---|---|---|---|---|----------------|------------|
| Session Hijack | 7 | 7 | 6 | 8 | 7 | 35 | High |
| XSS | 6 | 5 | 5 | 7 | 6 | 29 | Medium |
| Brute Force | 4 | 3 | 2 | 4 | 3 | 16 | Low |
| Information Disclosure | 7 | 6 | 6 | 8 | 7 | 34 | High |
| Elevation of Privilege | 8 | 6 | 5 | 9 | 7 | 35 | High |

*D = Damage Potential | R = Reproducibility | E = Exploitability | A = Affected Users | D = Discoverability*

---

## Mitigation Summary
- Session Hijack: JWT expiry, secure token handling
- XSS: Helmet CSP headers, output sanitization
- Brute Force: Rate limiting 100 req/15min
- Information Disclosure: AES encryption, generic error messages
- Elevation of Privilege: Role-based access control middleware

---

## Risk Handling Strategy
- High Risks: Fix before release
- Medium Risks: Monitor and patch
- Low Risks: Accept or monitor