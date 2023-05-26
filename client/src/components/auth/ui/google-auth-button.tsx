import Google from "../icons/google";

export default function GoogleAuthButton() {
  return (
    <button className="flex w-full items-center justify-center rounded-md border border-grey/60 py-3 font-medium">
      <span className="mr-3">
        <Google />
      </span>
      Continue with Google
    </button>
  );
}
