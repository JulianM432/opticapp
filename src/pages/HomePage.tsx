import { useEffect, useState } from 'react';
import { fetchHealth, type HealthResponse } from '@/api/client';
import { Button } from '@/components/ui/button';

export function HomePage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadHealth = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchHealth();
      setHealth(data);
    } catch {
      setError('No se pudo conectar con el backend');
      setHealth(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadHealth();
  }, []);

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">Opticapp</h1>
        <p className="text-muted-foreground">
          Vidriera de catálogo de armazones para tu óptica.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-medium">Estado del backend</h2>

        {loading && <p className="text-muted-foreground">Consultando...</p>}

        {!loading && error && (
          <p className="text-destructive">{error}</p>
        )}

        {!loading && health && (
          <dl className="grid gap-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Status</dt>
              <dd className="font-medium">{health.status}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">MongoDB</dt>
              <dd className="font-medium">{health.mongodb}</dd>
            </div>
          </dl>
        )}

        <Button className="mt-4" onClick={() => void loadHealth()} type="button">
          Reintentar
        </Button>
      </div>
    </section>
  );
}
