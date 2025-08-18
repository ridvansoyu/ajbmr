export default function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-2xl md:text-3xl font-serif font-medium mb-4">{title}</h2>
      <div className="w-24 h-1 bg-primary-600 mx-auto" />
    </div>
  );
}


