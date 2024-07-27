import AlterResume from "@/components/AlterResume";
import LogoutButton from "@/components/LogoutButton";
import UploadResume from "@/components/UploadResume";

export default function Page() {
  return (
    <>
      <LogoutButton />
      <UploadResume />
      <AlterResume />
    </>
  );
}
