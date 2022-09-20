import React from "react";

type Props = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
};

export const SearchBar = ({
  placeholder = "Search...",
  className = "",
  value,
  onChange,
  onSubmit,
}: Props) => {
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter" && onSubmit) {
      event.preventDefault();
      onSubmit(event.currentTarget.value);
    }
  };

  return (
    <form className={`flex items-center ${className}`}>
      <label className="sr-only">Search</label>
      <div className="relative w-full ">
        <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_5324_117342)">
              <path
                d="M1.22674 11.1309C2.01019 12.9744 3.49388 14.4311 5.3514 15.1806C7.20892 15.9302 9.28812 15.9111 11.1316 15.1277C12.9751 14.3442 14.4318 12.8605 15.1813 11.003C15.9309 9.14549 15.9118 7.06629 15.1284 5.22282C14.3449 3.37935 12.8612 1.9226 11.0037 1.17306C9.1462 0.423515 7.067 0.442567 5.22353 1.22602C3.38006 2.00948 1.92331 3.49317 1.17377 5.35069C0.424225 7.20821 0.443278 9.28741 1.22674 11.1309V11.1309Z"
                stroke="#E8E8EA"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.5176 13.5167L19.3751 19.3751"
                stroke="#E8E8EA"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_5324_117342">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          className="block w-full py-4 pl-6 text-xs border rounded-full border-grey-600 bg-grey-800 pr-14 text-grey-100 focus:border-primary-blue-500 focus:ring-0"
          placeholder={placeholder}
          required
        />
      </div>
    </form>
  );
};
