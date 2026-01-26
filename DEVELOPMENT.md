# Developer Guidelines - Turvasiipi

## 🎯 Purpose

This guide ensures that the application remains stable and functional as you develop new features. Following these guidelines prevents the common pitfalls that cause language switching failures and other bugs.

---

## 🚦 Before You Start Coding

- [ ] Read and understand the feature requirements
- [ ] Check if translations are needed
- [ ] Plan which namespaces you'll use

---

## 📝 Working with Translations

### Adding a New Page with Translations

**1. Create translation files**

Create JSON files for BOTH languages:
```bash
src/translations/fi/my-page.json
src/translations/en/my-page.json
```

**2. Register the namespace**

Edit `src/context/LanguageContext.tsx`:

```typescript
const loaders: Record<Language, Record<string, () => Promise<{ default: any }>>> = {
  fi: {
    // ... existing
    'my-page': () => import('../translations/fi/my-page.json'),  // ADD THIS
  },
  en: {
    // ... existing  
    'my-page': () => import('../translations/en/my-page.json'),  // ADD THIS
  }
};
```

**3. Use in your component**

```tsx
import { useLanguage } from '@/context/LanguageContext';

export default function MyPage() {
  const { t, loadNamespace } = useLanguage();
  
  // ⚠️ CRITICAL: Always include loadNamespace in dependencies!
  useEffect(() => {
    loadNamespace('my-page');
  }, [loadNamespace]); // ← MUST INCLUDE THIS!
  
  return (
    <div>
      <h1>{t('my-page.title')}</h1>
      <p>{t('my-page.description')}</p>
    </div>
  );
}
```

### Common Translation Patterns

**Simple strings:**
```tsx
{t('namespace.key')}
```

**With variables:**
```tsx
{t('namespace.greeting', { name: 'Alice' })}
// Translation: "Hei, {{name}}!"
```

**Arrays/Objects:**
```tsx
const items = t('namespace.items', { returnObjects: true });
```

---

## ⚠️ Critical Rules

### Rule #1: Hook Dependencies

**NEVER do this:**
```tsx
useEffect(() => {
  loadNamespace('tactics');
}, []); // ❌ WRONG - empty array
```

**ALWAYS do this:**
```tsx
useEffect(() => {
  loadNamespace('tactics');
}, [loadNamespace]); // ✅ CORRECT
```

**Why?** When language switches, `loadNamespace` is recreated. Without it in the dependency array, your component won't reload translations.

### Rule #2: Test Both Languages

Before committing:
1. ✅ Test your feature in Finnish
2. ✅ Switch to English and test again
3. ✅ Switch back to Finnish
4. ✅ Check browser console for errors

### Rule #3: Don't Use `any` Unnecessarily

```tsx
// ❌ BAD
const data: any = fetchData();

// ✅ GOOD
interface MyData {
  id: string;
  name: string;
}
const data: MyData = fetchData();
```

**Exception**: Translation contexts use `any` for JSON structures - this is intentional and documented in the code.

---

## 🧪 Pre-Commit Checklist

Before you commit code:

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` has no errors
- [ ] Feature works in Finnish (FI)
- [ ] Feature works in English (EN)
- [ ] Switched between languages multiple times
- [ ] No console errors or warnings
- [ ] All new translation keys exist in BOTH languages

---

## 🐛 Common Mistakes & Fixes

### Problem: "Text shows as translation keys (e.g., 'tactics.page.title')"

**Cause**: Namespace not loaded

**Fix**:
1. Check `useEffect` has `loadNamespace` call
2. Verify `[loadNamespace]` in dependency array
3. Confirm namespace registered in `LanguageContext.tsx`

### Problem: "Images don't show in English"

**Cause**: Translation file missing or empty

**Fix**:
1. Check `src/translations/en/[namespace].json` exists
2. Verify file has carousel/image data matching Finnish version

### Problem: "Language switch causes blank page"

**Cause**: Component crashed during language change

**Fix**:
1. Check browser console for errors
2. Look for missing translation keys
3. Verify all namespaces are loaded before use

---

## 🏗️ State Management

### Using LocalStorage

**DON'T** access localStorage directly:
```tsx
// ❌ BAD
localStorage.setItem('key', JSON.stringify(data));
```

**DO** use hooks:
```tsx
// ✅ GOOD
import { useLocalStorage } from '@/hooks/useLocalStorage';

const [data, setData] = useLocalStorage('key', defaultValue);
```

### Using Context

**Provider Pattern**:
```tsx
// In a provider component
import { ProgressContext } from '@/context/ProgressContext';

const { completeModule, progress } = useProgress();
```

---

## 📐 Code Style

### Component Structure

```tsx
'use client'; // If needed

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function MyComponent() {
  // 1. Hooks first
  const { t, loadNamespace } = useLanguage();
  
  // 2. State
  const [state, setState] = useState(initial);
  
  // 3. Effects
  useEffect(() => {
    loadNamespace('namespace');
  }, [loadNamespace]);
  
  // 4. Handlers
  const handleClick = () => {
    // ...
  };
  
  // 5. Render
  return (
    <div>
      {/* ... */}
    </div>
  );
}
```

### TypeScript Types

```tsx
// Define prop types
interface MyComponentProps {
  title: string;
  onSave: (data: string) => void;
}

export default function MyComponent({ title, onSave }: MyComponentProps) {
  // ...
}
```

---

## 🔧 Tools & Commands

### Development

```bash
# Start dev server
npm run dev

# Type check (DO THIS before committing)
npm run typecheck

# Lint code
npm run lint

# Build (tests if production build works)
npm run build
```

### Finding Code

```bash
# Find all uses of a function
code --search "loadNamespace"

# Find translation keys
code --search "tactics.page"
```

---

## 📚 Resources

- **Translation System**: `src/context/LanguageContext.tsx`
- **Progress System**: `src/context/ProgressContext.tsx`  
- **Risk Analysis**: See `risk_analysis.md` artifact
- **Prevention Strategy**: See `prevention_strategy.md` artifact

---

## 🆘 Getting Help

If you're stuck:

1. Check this guide first
2. Search existing code for similar patterns
3. Check browser console for specific error messages
4. Review git history to see how similar features were implemented

---

## ✨ Best Practices Summary

1. **Translations**: Always in BOTH languages
2. **Hook deps**: Always include `loadNamespace`
3. **Testing**: Always test language switching
4. **Types**: Use TypeScript, avoid `any` except where justified
5. **State**: Use provided hooks and contexts
6. **Console**: Keep it clean - no errors in production

---

**Version**: 1.0  
**Last Updated**: 2026-01-25  
**Maintained by**: Development Team
