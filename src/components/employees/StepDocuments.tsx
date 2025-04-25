type Props = {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepDocuments({
  data,
  onChange,
  onNext,
  onBack,
}: Props) {
  const handleFile = (e: any) => {
    const { name, files } = e.target;
    onChange({ [name]: files[0] });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="file"
          name="appointmentLetter"
          onChange={handleFile}
          className="input"
        />
        <input
          type="file"
          name="salarySlip"
          onChange={handleFile}
          className="input"
        />
        <input
          type="file"
          name="relievingLetter"
          onChange={handleFile}
          className="input"
        />
        <input
          type="file"
          name="experienceLetter"
          onChange={handleFile}
          className="input"
        />
      </div>
      <div className="flex justify-between">
        <button onClick={onBack} className="btn-secondary">
          Back
        </button>
        <button onClick={onNext} className="btn-primary">
          Next
        </button>
      </div>
    </div>
  );
}
