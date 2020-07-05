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

type ConstraintState = Typestate<ConstraintContext>

export type ConstraintStateMachine = StateMachine<
	ConstraintContext,
	ConstraintSchema,
	ConstraintEvents,
	ConstraintState
>

export type useMachineBus = (
	machine: ConstraintStateMachine,
	opts?: any
) => [
	State<ConstraintContext, ConstraintEvents, any>,
	any,
	Interpreter<ConstraintContext, any, ConstraintEvents, any>
]

type MachineFactoryOptions = {
	id: string
	initial?:
		| 'noConstraintsSet'
		| 'constraintsUpdated'
		| 'constraintsApplied'
		| 'constraintLimitReached'
}

export type constraintMachineFactory = (options: MachineFactoryOptions) => ConstraintStateMachine

export type sendToBusWrapper = (
	event: ConstraintEvents,
	payload?: EventData | undefined
) => State<ConstraintContext, ConstraintEvents, ConstraintSchema, ConstraintState> | void
