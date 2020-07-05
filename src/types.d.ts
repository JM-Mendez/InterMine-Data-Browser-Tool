import { LOCK_ALL_CONSTRAINTS, RESET_ALL_CONSTRAINTS } from './globalActions'

import {
	RESET_LOCAL_CONSTRAINT,
	ADD_CONSTRAINT,
	REMOVE_CONSTRAINT,
	APPLY_CONSTRAINT,
} from './components/Constraints/actions'
import {
	MachineConfig,
	StateMachine,
	StateSchema,
	EventObject,
	State,
	Interpreter,
	EventData,
} from 'xstate'
import { Constraint } from './components/Constraints/Constraint'

export interface ConstraintSchema extends StateSchema {
	states: {
		noConstraintsSet: {}
		constraintsUpdated: {}
		constraintsApplied: {}
		constraintLimitReached: {}
	}
}

export type ConstraintEvents = EventObject &
	(
		| { to?: string; type: typeof LOCK_ALL_CONSTRAINTS }
		| { to?: string; type: typeof RESET_ALL_CONSTRAINTS }
		| { to?: string; type: typeof RESET_LOCAL_CONSTRAINT }
		| { to?: string; type: typeof ADD_CONSTRAINT; constraint: string }
		| { to?: string; type: typeof REMOVE_CONSTRAINT; constraint: string }
		| { to?: string; type: typeof APPLY_CONSTRAINT }
	)

export interface ConstraintContext {
	selectedValues: string[]
	availableValues: any[]
}

export type ConstraintMachineConfig = MachineConfig<
	ConstraintContext,
	ConstraintSchema,
	ConstraintEvents
>

type ConstraintTypeState = Typestate<ConstraintContext>
export type ConstraintState = State<ConstraintContext, ConstraintEvents>

export type ConstraintTypeStateMachine = StateMachine<
	ConstraintContext,
	ConstraintSchema,
	ConstraintEvents,
	ConstraintTypeState
>

// export interface Service extends Interpreter<ConstraintContext, any, ConstraintEvents, any> {
// 	send: Interpreter<ConstraintContext, any, ConstraintEvents, any>['send']
// 	state: Interpreter<ConstraintContext, any, ConstraintEvents, any>['state']
// }
export type Service = Interpreter<ConstraintContext, any, ConstraintEvents, any>

export type useMachineBus = (
	machine: ConstraintTypeStateMachine,
	opts?: any
) => [State<ConstraintContext, ConstraintEvents, any>, SendToBusWrapper, Service]

type MachineFactoryOptions = {
	id: string
	initial?:
		| 'noConstraintsSet'
		| 'constraintsUpdated'
		| 'constraintsApplied'
		| 'constraintLimitReached'
}

export type ConstraintMachineFactory = (
	options: MachineFactoryOptions
) => ConstraintTypeStateMachine

export type SendToBusWrapper = (
	event: ConstraintEvents,
	payload?: EventData | undefined
) => State<ConstraintContext, ConstraintEvents, ConstraintSchema, ConstraintTypeState> | void

export type UseServiceContext = () => [Service['state'], Service['send']]
