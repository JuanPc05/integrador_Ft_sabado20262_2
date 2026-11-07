// src/features/auth/PerfilPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Icon } from '@/components/common';
import { useAuth } from '@/features/auth/useAuth';
import { authService } from '@/features/auth/auth.service';
import { USER_STORAGE_KEY } from '@/core/httpClient';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

export function PerfilPage() {
  const { user } = useAuth();
  const [successMessage, setSuccessMessage] = useState('');

  const handleUpdateProfile = async (payload) => {
    setSuccessMessage('');

    const updatedUser = await authService.updateProfile(user?.id, payload);

    // Actualizar datos del usuario en localStorage para persistir los cambios en sesión
    if (updatedUser) {
      localStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify({ ...user, ...updatedUser })
      );
    }

    setSuccessMessage('Perfil actualizado correctamente.');
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      {/* Migas de pan */}
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-label-sm font-label-sm text-outline hover:text-white transition-colors"
        >
          <Icon name="arrow_back" className="text-[16px] text-primary" />
          <span>Volver al Dashboard</span>
        </Link>
      </div>

      {/* Tarjeta Principal */}
      <div className="bg-surface-container-low/95 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-10 shadow-2xl shadow-black/80 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary-container to-transparent opacity-80" />

        <div className="mb-8 flex flex-col items-start">
          <Badge variant="primary" withDot dotPulsing>
            Configuración de Cuenta
          </Badge>
          <h1 className="text-headline-lg font-headline-lg text-on-surface mt-3 mb-2 tracking-tight">
            Editar Perfil
          </h1>
          <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
            Actualiza tu información personal y credenciales de acceso en el ecosistema CESDE Conecta.
          </p>
        </div>

        {successMessage && (
          <div
            role="status"
            className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
          >
            <Icon name="check_circle" className="text-[20px] text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <RegisterForm
          key={user?.id || 'perfil'}
          initialData={user}
          onSubmit={handleUpdateProfile}
        />
      </div>
    </div>
  );
}

export default PerfilPage;

