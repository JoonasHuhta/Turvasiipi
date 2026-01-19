export function CheckItem({ text }: { text: string }) {
    return (
        <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#E8DDD0] flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-2.5 h-2.5 bg-[#5B4B8A] rounded-full" />
            </div>
            <p className="text-sm font-medium text-[#2B2B2B]">{text}</p>
        </div>
    );
}
