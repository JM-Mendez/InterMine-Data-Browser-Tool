import { useMachine } from '@xstate/react'
import { createContext, useContext } from 'react'

const enableMocks =
	process.env.NODE_ENV?.toLowerCase() === 'development' ||
	process.env.STORYBOOK_USEMOCK?.toLowerCase() === 'true'

export const MockMachineContext = createContext(null)

const interpretedMachines = new Set()
const sendToBus = () => {}

/**
 *
 * @param machine { import('xstate').StateMachine}
 */
export const useMachineBus = (machine) => {
	let machineToInterpret = machine

	if (enableMocks) {
		// We only use this during development or storybook configs, so it's
		// safe to use inside the conditional here. It will either always be
		// called, or not called at all.
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const machineMock = useContext(MockMachineContext)

		if (machineMock?.id === machine.id) {
			machineToInterpret = machineMock
		}
	}

	const [state, , service] = useMachine(machineToInterpret)
	interpretedMachines.add(service)

	return [state, sendToBus, service]
}
