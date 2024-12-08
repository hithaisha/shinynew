import React from "react";
import man from "../../../assets/images/dashboard/man.png";
import { useSelector } from 'react-redux';

const UserPanel = () => {
	const {user} = useSelector(state => state.auth);
console.log(user)
	return (
		<div>
			<div className="sidebar-user text-center">
				<div>
					<img
						className="img-60 rounded-circle lazyloaded blur-up"
						src={man}
						alt="#"
					/>
				</div>
				<h6 className="mt-3 f-14">{user? `${user?.firstName} ${user?.lastName}` : "-"}</h6>
				<p>{user?.role ? `${user?.role}` : "-"}</p>
			</div>
		</div>
	);
};

export default UserPanel;
