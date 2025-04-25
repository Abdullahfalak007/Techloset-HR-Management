type Props = {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
};

export default function StepPersonalInfo({ data, onChange, onNext }: Props) {
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          name="firstName"
          placeholder="First Name"
          value={data.firstName}
          onChange={handleChange}
          className="input"
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={data.lastName}
          onChange={handleChange}
          className="input"
        />
        <input
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className="input"
        />
        <input
          name="phone"
          placeholder="Phone Number"
          value={data.phone}
          onChange={handleChange}
          className="input"
        />
        <input
          name="dob"
          type="date"
          value={data.dob}
          onChange={handleChange}
          className="input"
        />
        <input
          name="maritalStatus"
          placeholder="Marital Status"
          value={data.maritalStatus}
          onChange={handleChange}
          className="input"
        />
        <input
          name="gender"
          placeholder="Gender"
          value={data.gender}
          onChange={handleChange}
          className="input"
        />
        <input
          name="nationality"
          placeholder="Nationality"
          value={data.nationality}
          onChange={handleChange}
          className="input"
        />
        <input
          name="address"
          placeholder="Address"
          value={data.address}
          onChange={handleChange}
          className="input col-span-2"
        />
        <input
          name="city"
          placeholder="City"
          value={data.city}
          onChange={handleChange}
          className="input"
        />
        <input
          name="state"
          placeholder="State"
          value={data.state}
          onChange={handleChange}
          className="input"
        />
        <input
          name="zipCode"
          placeholder="Zip Code"
          value={data.zipCode}
          onChange={handleChange}
          className="input"
        />
      </div>
      <button onClick={onNext} className="btn-primary">
        Next
      </button>
    </div>
  );
}
