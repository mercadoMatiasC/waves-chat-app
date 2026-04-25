export function MutationMessages({ mutation }) {
    if (!mutation) return null;

    const hasError = mutation.isError;
    const isSuccess = mutation.isSuccess;

    return (
        <div className="min-h-10 transition-all duration-300">
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
    );
}