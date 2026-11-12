type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className = '' }: LogoMarkProps) {
  return (
    <svg className={className} viewBox="0 0 98 64" fill="none" aria-hidden="true" focusable="false">
      <path d="M11 10V54M18 33L40 10M18 31L40 54M49 10V54M78 10V54M49 32H78" stroke="currentColor" strokeWidth="7.5" strokeLinecap="square" strokeLinejoin="miter" />
      <rect x="86" y="47" width="8" height="8" fill="var(--rose)" />
    </svg>
  );
}
