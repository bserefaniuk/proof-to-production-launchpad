# Compliance Primer – Checklist

Use this primer to flag regulatory requirements before they derail your production launch. Treat it as a living document: start with assumptions, then replace them with confirmed answers as you speak with stakeholders or legal advisors.

## How to Use

1. List the types of data you collect and where it resides.
2. Check which regulations might apply based on geography, industry, and payment flows.
3. Record the proof you already have (policies, controls, vendor agreements) and what remains unresolved.
4. Add owners and deadlines so follow-ups don’t slip while you harden the PoC.

| Data / Feature Area | Potential Regulation | Current Readiness | Proof / References | Gaps & Next Actions | Owner | Review Date |
| --- | --- | --- | --- | --- | --- | --- |
| User accounts (EU residents) | GDPR | 🟡 Partial | AWS region set to eu-west-1; privacy policy draft saved | Need DPA with analytics vendor; confirm data retention policy | Bohdan | 2026‑01‑01 |
| Payment processing | PCI DSS | 🔴 None | Using Stripe Checkout (tokenized) | Document SAQ A scope; enforce least privilege on billing dashboards | Teo | 2026‑01‑01 |
| Health metrics pilot | HIPAA | 🔴 None | Data stored encrypted at rest | Need BAA with hosting provider; define access logs retention | Lucas | 2026‑01‑01 |
|  |  |  |  |  |  |  |

**Legend:** 🟢 Ready · 🟡 Partial · 🔴 Missing

### Quick Questions to Revisit

- Do we transfer data across borders that require additional agreements?  
- Which third-party vendors store or process sensitive data on our behalf?  
- Are incident response and breach notification steps documented for each regulation?  
- When is our next compliance review, and what evidence will we present?

Link this primer to `compliance-notes-template.md` once you validate your assumptions so the details stay consistent across docs.
