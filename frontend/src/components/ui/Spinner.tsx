export default function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex items-center space-x-3 text-primary-600">
        <div className="h-6 w-6 rounded-full border-2 border-primary-200 border-t-primary-600 animate-spin" />
        {label ? <span className="text-sm font-medium text-gray-600">{label}</span> : null}
      </div>
    </div>
  );
}


