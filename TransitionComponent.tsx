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
<!-- 		const ele = nodeRef?.current; -->
	}, [status, nodeRef]);

	return (
		<Transition
			nodeRef={nodeRef}
			in={inProp}
			timeout={500}
			appear={true}
			exit={true}
			onEntering={() => requestAnimationFrame(() => animejs({
				targets: nodeRef.current? nodeRef.current: null,
				translateY: {
					value: ["200%", "0%"],
					duration: 250,
					easing: "easeOutElastic(1, .6)"
				},
				opacity: {
					value: [0, 1],
					duration: 50,
					easing: "easeInOutCubic"
				},
					// delay: 1000
				})
			)}
			onEntered={() => setStatus("entered")}
			onExiting={() => requestAnimationFrame(() => animejs({
				targets: nodeRef.current,
				translateY: {
					value: ["0%", "200%"],
					duration: 20,
					easing: "easeOutElastic(1, .6)"
				},
				opacity: {
					value: [1, 0],
					duration: 50,
					easing: "easeInOutCubic"
				},
				})
			)}
			onExited={() => setStatus("exited")}
			mountOnEnter
			unmountOnExit
		>
			{(state) => {
				return children(nodeRef, state);
			}}
		</Transition>
	);
}

export default TransitionComponent;
