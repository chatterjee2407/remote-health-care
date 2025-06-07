const MedicalRecord = ({ name, doctor, date, description }: any) => {
  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">{name}</h2>
        <span className="text-sm text-muted-foreground">{date}</span>
      </div>
      <p className="text-sm">
        Doctor: {doctor}
      </p>
      <p className="text-sm">
        {description}
      </p>
    </div>
  );
};

const MedicalRecordsPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Medical Records</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MedicalRecord
          name="Medical Record 1"
          doctor="Dr. John Doe"
          date="2022-01-01"
          description="This is a sample medical record."
        />
        <MedicalRecord
          name="Medical Record 2"
          doctor="Dr. Jane Doe"
          date="2022-01-15"
          description="This is a sample medical record."
        />
        <MedicalRecord
          name="Medical Record 3"
          doctor="Dr. John Smith"
          date="2022-02-01"
          description="This is a sample medical record."
        />
      </div>
    </section>
  );
};

export default MedicalRecordsPage;