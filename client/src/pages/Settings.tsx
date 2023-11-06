import { Separator } from "../../components/ui/separator";
import { ProfileForm } from "../features/settings/components/ProfileForm";

export default function Settings() {
  return (
    <div className="p-8">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator className="my-4" />
      <ProfileForm />
    </div>
  );
}
