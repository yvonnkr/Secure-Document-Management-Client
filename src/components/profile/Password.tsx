import React, {useEffect} from 'react';
import {z} from 'zod';
import {useForm} from "react-hook-form";
import {UpdatePassword} from "../../models/ICredentials.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {userAPI} from "../../services/UserService.ts";
import Loader from "./Loader.tsx";

const schema = z.object({
    newPassword: z.string().min(5, {message: 'New password is required'}),
    confirmNewPassword: z.string().min(5, {message: 'Confirm password is required'}),
    currentPassword: z.string().min(5, {message: 'Password is required'}),
}).superRefine(({newPassword, confirmNewPassword}, ctx) => {
    if (newPassword !== confirmNewPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['confirmNewPassword'],
            message: 'New password and confirm password do not match'
        })
    }
});

const Password = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: form,
        getFieldState
    } = useForm<UpdatePassword>({resolver: zodResolver(schema), mode: 'onTouched'});

    const {isSuccess, isLoading} = userAPI.useFetchUserQuery();

    const [updatePassword, {
        isLoading: updateLoading,
        isSuccess: updateSuccess
    }] = userAPI.useUpdatePasswordMutation();

    const isFieldValid = (fieldName: keyof UpdatePassword): boolean => getFieldState(fieldName, form).isTouched && !getFieldState(fieldName, form).invalid;

    const onUpdatePassword = async (request: UpdatePassword) => await updatePassword(request);

    useEffect(() => reset(), [reset, updateSuccess]);

    return (
        <>
            {isLoading && <Loader/>}
            {isSuccess && <>
                <h4 className="mb-3">Password</h4>
                <hr/>
                <form onSubmit={handleSubmit(onUpdatePassword)} className="needs-validation" noValidate>
                    <div className="row g-3">
                        <div className="col-12">
                            <label htmlFor="currentPassword" className="form-label">Current Password</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text"><i className="bi bi-key"></i></span>
                                <input type="password" {...register('currentPassword')}
                                       className={`form-control ' ${form.errors.currentPassword ? 'is-invalid' : ''} ${isFieldValid('currentPassword') ? 'is-valid' : ''}`}
                                       name="currentPassword" placeholder="Current password" required/>
                                <div className="invalid-feedback">{form.errors.currentPassword?.message}</div>
                            </div>
                        </div>
                        <hr className="my-4"/>
                        <div className="col-12">
                            <label htmlFor="newPassword" className="form-label">New Password</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text"><i className="bi bi-key"></i></span>
                                <input type="password" {...register('newPassword')}
                                       className={`form-control ' ${form.errors.newPassword ? 'is-invalid' : ''} ${isFieldValid('newPassword') ? 'is-valid' : ''}`}
                                       name="newPassword" placeholder="New password" required/>
                                <div className="invalid-feedback">{form.errors.newPassword?.message}</div>
                            </div>
                        </div>
                        <div className="col-12">
                            <label htmlFor="address" className="form-label">Confirm New Password</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text"><i className="bi bi-key"></i></span>
                                <input type="password" {...register('confirmNewPassword')}
                                       className={`form-control ' ${form.errors.confirmNewPassword ? 'is-invalid' : ''} ${isFieldValid('confirmNewPassword') ? 'is-valid' : ''}`}
                                       name="confirmNewPassword" placeholder="Confirm new password" required/>
                                <div className="invalid-feedback">{form.errors.confirmNewPassword?.message}</div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4"/>
                    <div className="col">
                        <button disabled={!form.isValid || form.isSubmitting || isLoading || updateLoading}
                                className="btn btn-primary btn-block" type="submit">
                            {(form.isSubmitting || isLoading || updateLoading) &&
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                            <span
                                role="status">{(form.isSubmitting || isLoading || updateLoading) ? 'Loading...' : 'Update'}</span>
                        </button>
                    </div>
                </form>
            </>}
        </>
    )
};

export default Password;
