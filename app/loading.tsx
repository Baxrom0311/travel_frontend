import { Spinner } from '@/components/loading';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Spinner size={40} />
        <p className="mt-4 text-sm text-muted-foreground">Yuklanmoqda...</p>
      </div>
    </div>
  );
}
