import { useEffect, useRef, useState } from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import animejs from "animejs";

interface ITransitionComponent {
	children: any;
	inProp: boolean;
}

function TransitionComponent({ children, inProp }: ITransitionComponent) {
	const nodeRef = useRef(null);
	let [status, setStatus] = useState<TransitionStatus>();

	useEffect(() => {
		const ele = nodeRef?.current;

		if (ele) {
			status === "entering" &&
				animejs({
					targets: ele,
					translateY: {
						value: ["200%", "0%"],
						duration: 250,
						easing: "easeOutElastic(1, .6)",
					},
					opacity: {
						value: [0, 1],
						duration: 50,
						easing: "easeInOutCubic",
					},
				});

			status === "exiting" &&
				animejs({
					targets: ele,
					translateY: {
						value: ["0%", "200%"],
						duration: 20,
						easing: "easeOutElastic(1, .6)",
					},
					opacity: {
						value: [1, 0],
						duration: 50,
						easing: "easeInOutCubic",
					},
				});
		}
	}, [status, nodeRef]);

	return (
		<Transition
			nodeRef={nodeRef}
			in={inProp}
			timeout={500}
			appear={true}
			exit={true}
			mountOnEnter
			unmountOnExit
		>
			{(state) => {
				setStatus(state);
				return children(nodeRef);
			}}
		</Transition>
	);
}

export default TransitionComponent;
