import { Avatar, Button, Stack, TextField, Typography } from "@mui/material"
import { PageLayout } from "../components/PageLayout"
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/clerk-react";
import { useCreateCustomerMutation, useUpdateCustomerMutation } from "../react-query/customerQueries";
import { useNavigate, useNavigation } from "react-router-dom";
import { useEffect } from "react";




export const OnboardingPage = () => {
    const { register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const { user } = useUser();
    const {mutate: createMutation, data: newUser} = useCreateCustomerMutation("");

    useEffect(() => {
        if (!user) return;
        console.log(user.unsafeMetadata)
        if (user && user.unsafeMetadata?.onboardingCompleted && user.unsafeMetadata?.customerId) {
            navigate('/products')
        }
    }, [user]) 

    const onSubmit = async (data: any) => {
        try {
          createMutation(data);
          await user!.update({
            unsafeMetadata: {
              customerId: newUser._id,
              onboardingCompleted: true,
            },
          });
          navigate("/");          
        } catch (err) {
          console.error(err);
        }
    }

    return (
      <PageLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
          <Typography variant="h5">Complete our onboarding process to start using SustainMind</Typography>
            {/* <Avatar
              sx={{ width: 120, height: 120 }}
              src={profileImageUrl}
              alt="profile"
            /> */}
            <i className="fa-user" />
            <TextField label="Company name*" {...register("companyName")} />
            <TextField label="Country*" {...register("country")} />
            <TextField label="City*" {...register("city")} />

            <TextField label="ZIP-Code*" {...register("zipcode")} />
            <TextField label="Address*" {...register("address")} />
            <TextField
              label="Name of contact person*"
              {...register("contactPersonName")}
            />
            <TextField
              label="E-Mail of contact person*"
              {...register("contactPersonEmail")}
            />
            <TextField
              label="Number of employees"
              {...register("numberOfEmployees")}
            />
            <TextField label="Revenue" {...register("revenue")} />
            <Button variant="contained" color="success" type="submit">
                Save
            </Button>
          </Stack>
        </form>
      </PageLayout>
    );
}