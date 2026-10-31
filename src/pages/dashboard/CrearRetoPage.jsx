// src/pages/dashboard/CrearRetoPage.jsx
import { RetoLayout } from "../../layouts/RetoLayout";
import { CreateChallengeForm } from "../../components/retos";

export const CrearRetoPage = () => {
  return (
    <RetoLayout>
      <CreateChallengeForm />
    </RetoLayout>
  );
};

export default CrearRetoPage;