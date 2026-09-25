"use client";

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast = ({ message, onClose }: ToastProps) => {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-md border border-[#30353d] bg-[#15181e] px-4 py-3 shadow-2xl">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ccff00] text-[11px] font-black text-black">
          ✓
        </span>

        <p className="text-xs font-medium text-white">{message}</p>

        <button
          type="button"
          onClick={onClose}
          className="ml-2 text-[#666b73] hover:text-white"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
