import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { api } from "~/utils/api";

const useHandleLogIn = () => {
  const { user, isSignedIn } = useUser();
  const { mutate: createUser } = api.user.create.useMutation();

  useEffect(() => {
    if (isSignedIn && user) {
      const payload = {
        first_name: user.firstName,
        last_name: user.lastName,
        avatar_url: user.imageUrl,
      };

      createUser(payload);
    }
  }, [isSignedIn, user, createUser]);
};

export default useHandleLogIn;
