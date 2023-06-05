import { UserProfile } from "@clerk/clerk-react"
import { PageLayout } from "../components/PageLayout"
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { useUser } from '@clerk/clerk-react';
import { useEffect } from "react";
import { useForm } from "react-hook-form";


export const ProfilePage = () => {
    const { user } = useUser();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: any) => {
        if (!user) return;
        const { firstName, lastName } = data;
        delete data.firstName;
        delete data.lastName;
        const response = await user.update({
            unsafeMetadata: data,
            firstName,
            lastName,
        })
        console.log('res', response)
    }
    // useEffect(() => {
    //     const updateMetadata = async () => {
    //         if (!user) return;
    //         try {
    //             const response = await user.update({
    //                 unsafeMetadata: { data }
    //             });
    //             if (response) {
    //                 console.log('res', response)
    //             }
    //         } catch (err) {
    //             console.error('error', err)
    //         }
    //     };
    //     updateMetadata();
    // }, []);

    if (!user) return <></>;

    const {firstName, lastName, unsafeMetadata, publicMetadata, profileImageUrl, primaryEmailAddress} = user;
    // removePassword, updatePassword, update, phonerNumbers

    return (
      <PageLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="flex flex-col space-y-6">
            <Avatar
              sx={{ width: 120, height: 120 }}
              src={profileImageUrl}
              alt="profile"
            />
            <TextField
              label="Email"
              disabled
              value={primaryEmailAddress}
              {...register("primaryEmailAddress")}
            />
            <TextField
              label="Firstname"
              defaultValue={firstName}
              {...register("firstName")}
            />
            <TextField
              label="Lastname"
              defaultValue={lastName}
              {...register("lastName")}
            />

            <TextField
              label="Phone"
              defaultValue={unsafeMetadata?.phone}
              {...register("phone")}
            />
            <TextField
              label="Description"
              defaultValue={unsafeMetadata?.description}
              {...register("description")}
            />
            {/* <Box className="space-y-4 flex flex-col">
            <TextField label="Address" value={unsafeMetadata?.address} />
            <TextField label="City" value={unsafeMetadata?.city} />
            <TextField label="State" value={unsafeMetadata?.state} />
            <TextField label="Zip" value={unsafeMetadata?.zip} />
            <TextField label="Country" value={unsafeMetadata?.country} />
          </Box> */}
            <Button variant="contained" color="success" type="submit">
              Save
            </Button>
          </Box>
        </form>
      </PageLayout>
    );
}