import React from 'react';

interface AdminCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    className?: string;
}

const AdminCheckbox: React.FC<AdminCheckboxProps> = ({
    checked,
    onChange,
    label,
    disabled = false,
    className = ''
}) => {
    return (
        <label className={`inline-flex items-center gap-3 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
            <div className="relative">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    disabled={disabled}
                    className="sr-only peer"
                />
                <div className={`
          w-5 h-5 rounded-md border-2 transition-all duration-200
          flex items-center justify-center
          ${checked
                        ? 'bg-brand-orange border-brand-orange'
                        : 'bg-bg-sub/50 border-border hover:border-brand-orange/50'
                    }
          ${disabled ? '' : 'peer-focus:ring-2 peer-focus:ring-brand-orange/30'}
        `}>
                    {checked && (
                        <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    )}
                </div>
            </div>
            {label && (
                <span className="text-sm font-medium text-text-main">{label}</span>
            )}
        </label>
    );
};

export default AdminCheckbox;
