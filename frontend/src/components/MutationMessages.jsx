export function MutationMessages({ mutation }){
    return (
        <>
            {mutation.isSuccess && (
                <div className="bg-green-500/20 text-green-500 p-3 rounded-lg mb-4 text-sm border border-green-500/50">
                    <span>Successfully submitted</span>
                </div>
            )}

            {mutation.error && (
                <div className="bg-red-500/20 text-red-500 p-3 rounded-lg mb-4 text-sm border border-red-500/50">
                    {mutation.error.errors 
                        ? Object.values(mutation.error.errors).flat()[0] 
                        : mutation.error.message}
                </div>
            )}
        </>
    );
}