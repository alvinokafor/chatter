import { FormField } from "@modules/auth/signup-form";

export default function FormInput({
  field_id,
  field_title,
  field_type,
}: FormField) {
  return (
    <div className="flex flex-col space-y-4">
      <label className="font-medium" htmlFor={field_id}>
        {field_title}
      </label>
      <input
        className="rounded-md border border-grey/60 p-3 outline-grey/75"
        placeholder={field_title}
        type={field_type}
        id={field_id}
      />
    </div>
  );
}
