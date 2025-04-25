type Props = {
  data: any;
  onChange: (data: any) => void;
  onBack: () => void;
  onSubmit: () => void;
  submitting: boolean;
};

export default function StepAccountAccess({
  data,
  onChange,
  onBack,
  onSubmit,
  submitting,
}: Props) {
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className="input"
        />
        <input
          name="slackId"
          placeholder="Slack ID"
          value={data.slackId}
          onChange={handleChange}
          className="input"
        />
        <input
          name="skypeId"
          placeholder="Skype ID"
          value={data.skypeId}
          onChange={handleChange}
          className="input"
        />
        <input
          name="githubId"
          placeholder="Github ID"
          value={data.githubId}
          onChange={handleChange}
          className="input"
        />
      </div>
      <div className="flex justify-between">
        <button onClick={onBack} className="btn-secondary">
          Back
        </button>
        <button
          onClick={onSubmit}
          className="btn-primary"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
