<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- The cloned KHWWC app (src/SawaApp.tsx) renders client-only via src/routes/index.tsx and $.tsx; its react-router-style imports go through src/lib/router-compat.tsx (TanStack-backed shim) — keeps the original source nearly untouched.
- Styling uses the legacy tailwind.config.js via @config in src/styles.css — preserves the original design classes.
