import React, {useRef, useState} from "react";
import {useDependencyContext} from "../dependency.context";
import {useNavigate, useParams} from "react-router";
import {genderToString} from "../utils/gender.utils";
import FutureData from "../components/FutureData";
import {Close, Delete, Edit} from "@material-ui/icons";
import "./user-details-page.scss";
import {routes} from "../Router";
import {useApiMessage} from "../api-message.context";
import {errorHandler} from "../utils/error-handler";
import EditableElement from "../components/EditableElement";
import Button from "../components/Button";
import DateSelector from "../components/DateSelector";
import NullableInput from "../components/NullableInput";
import DropDown from "../components/DropDown";
import Gender from "../domain/entities/gender";
import {User} from "../domain/entities/user.entity";
import {unwrapValue} from "../utils/event.utils";
import {useResetState} from "../hooks/useResetState";
import SuccessMessage from "../components/SuccessMessage";
import {equalUsers} from "../utils/equalUsers";
import ErrorPage from "./ErrorPage";
import LabeledElement from "../components/LabeledElement";
import {isGender, isName, isPastDate, isValidAddress} from "../utils/validators";
import {validation} from "../utils/error.message";

export default function UserDetailsPage(): JSX.Element {
	const setApiMessage = useApiMessage();
	const navigate = useNavigate();
	const userDao = useDependencyContext().daos.userDao;
	const [editMode, setEditMode] = useState(false);
	const [success, setSuccess] = useResetState<boolean>(5000);

	const userRef = useRef<User | null>(null);

	const { userId } = useParams();

	if(!userId) throw new Error("ID param not found.");
	const id = parseInt(userId);
	if(isNaN(id)) throw new Error("Invalid id format.");

	function deleteUser() {
		userDao
			.remove(id)
			.then(() => {
				navigate(routes.listUsers);
				setSuccess(true);
			})
			.catch(e => setApiMessage(errorHandler(e, { 404: "User not found." })));
	}

	return (
		<div id={"userDetailsPage"}>
			{success && <SuccessMessage message={"User updated successfully!"} closer={() => setSuccess(false)} />}
			<FutureData
				repository={() => userDao.findById(id)}
				viewFactory={(user, setUser) => {
					const setUserWrapper = (prop: keyof User, value: any) => setUser({ ...user, [prop]: value });
					const setName = (name: string) => setUserWrapper("name", name);
					const setSurname = (surname: string) => setUserWrapper("surname", surname);
					const setBirthdate = (birthdate: Date) => setUserWrapper("birthdate", birthdate);
					const setGender = (gender: Gender) => setUserWrapper("gender", gender);
					const setWorkAddress = (address: string | null) => setUserWrapper("workAddress", address);
					const setHomeAddress = (address: string | null) => setUserWrapper("homeAddress", address);

					function showRequired() {
						return editMode && <span className={"required"}>*</span>;
					}

					if(!editMode) {
						userRef.current = user;
					}

					function onSubmit() {
						userDao.updateById(user.id, {
							name: user.name,
							surname: user.surname,
							gender: user.gender,
							birthdate: user.birthdate,
							workAddress: user.workAddress,
							homeAddress: user.homeAddress,
						})
							.then(user => {
								setUser(user);
								setEditMode(false);
								setSuccess(true);
							})
							.catch(error => setApiMessage(errorHandler(error)));
					}

					return (
						<>
							<div id={"actions"}>
								<h3>{userRef.current?.name} {userRef.current?.surname}</h3>
								{editMode
									? <Close className={"action-icon"} onClick={() => {
											setEditMode(false);
											userRef.current && setUser(userRef.current);
										}}
									/>
									: <Edit className={"action-icon"} onClick={() => {
											setEditMode(true);
											userRef.current = user;
										}}
									/>
								}
								<Delete className={"action-icon"} onClick={() => deleteUser()} />
							</div>
							<table id={"userDetails"} className={editMode ? "edit-mode" : ""}>
								<tbody>
								<tr>
									<th>Name {showRequired()}</th>
									<td>
										<EditableElement
											editMode={editMode}
											readView={user.name}
											editView={
												<LabeledElement validator={isName} value={user.name} error={validation.nameLength}>
													<input value={user.name} onChange={e => setName(unwrapValue(e))}/>
												</LabeledElement>
											}
										/>
									</td>
								</tr>
								<tr>
									<th>Surname {showRequired()}</th>
									<td>
										<EditableElement
											editMode={editMode}
											readView={user.surname}
											editView={
												<LabeledElement validator={isName} value={user.surname} error={validation.surnameLength}>
													<input value={user.surname} onChange={e => setSurname(unwrapValue(e))} />
												</LabeledElement>
											}
										/>
									</td>
								</tr>
								<tr>
									<th>Gender {showRequired()}</th>
									<td>
										<EditableElement
											editMode={editMode}
											readView={genderToString(user.gender)}
											editView={
												<LabeledElement validator={isGender} value={user.gender} error={validation.gender}>
													<DropDown
														value={user.gender}
														onChange={option => option && setGender(option.value)}
														options={[
															{ value: Gender.MALE, label: "Male" },
															{ value: Gender.FEMALE, label: "Female" },
														]}
													/>
												</LabeledElement>
											}
										/>
									</td>
								</tr>
								<tr>
									<th>Birthdate {showRequired()}</th>
									<td>
										<EditableElement
											editMode={editMode}
											readView={user.birthdate.toLocaleDateString()}
											editView={
												<LabeledElement validator={isPastDate} value={user.birthdate} error={validation.birthdate}>
													<DateSelector value={user.birthdate} onChange={date => setBirthdate(date)} />
												</LabeledElement>
											}
										/>
									</td>
								</tr>
								<tr>
									<th>Work Address</th>
									<td>
										<EditableElement
											editMode={editMode}
											readView={user.workAddress ?? "-"}
											editView={
												<LabeledElement validator={isValidAddress} value={user.workAddress} error={validation.workAddress}>
													<NullableInput value={user.workAddress} onChange={e => setWorkAddress(unwrapValue(e))} />
												</LabeledElement>
											}
										/>
									</td>
								</tr>
								<tr>
									<th>Home Address</th>
									<td>
										<EditableElement
											editMode={editMode}
											readView={user.homeAddress ?? "-"}
											editView={
												<LabeledElement validator={isValidAddress} value={user.homeAddress} error={validation.homeAddress}>
													<NullableInput value={user.homeAddress} onChange={e => setHomeAddress(unwrapValue(e))} />
												</LabeledElement>
											}
										/>
									</td>
								</tr>
								</tbody>
							</table>
							{editMode && (
								<div id={"editActions"}>
									<Button
										disabled={!userRef.current || equalUsers(user, userRef.current)}
										onClick={() => onSubmit()}
									>
										Submit
									</Button>
								</div>
							)}
						</>
					);
				}}
				onError={error => <ErrorPage error={error} overrides={{ 404: "User not found." }} />}
			/>
		</div>
	)
}