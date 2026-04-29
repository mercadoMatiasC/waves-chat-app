import { useEffect, useState } from "react";

export function MutationMessages({ mutation }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (mutation?.isSuccess || mutation?.isError) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [mutation?.isSuccess, mutation?.isError]);

    if (!mutation || !visible) return null;

    const hasError = mutation.isError;
    const isSuccess = mutation.isSuccess;

    return (
        (hasError || isSuccess) && (
            <div className="fixed bottom-5 right-5 z-50 w-full max-w-sm transition-all duration-300">
                {isSuccess && (
                    <div className="bg-green-500/20 text-green-500 p-3 rounded-lg mb-4 text-sm border border-green-500/50 animate-pulse">
                        <span>Action successful!</span>
                    </div>
                )}

                {hasError && (
                    <div className="bg-red-500/20 text-red-500 p-3 rounded-lg mb-4 text-sm border border-red-500/50">
                        {mutation.error.errors 
                            ? Object.values(mutation.error.errors).flat()[0] 
                            : mutation.error.message}
                    </div>
                )}
            </div>
        )
    );
}