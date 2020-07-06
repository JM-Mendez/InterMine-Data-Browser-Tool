import {
	EventData,
	EventObject,
	Interpreter,
	InterpreterOptions,
	MachineConfig,
	MachineOptions,
	State,
	StateConfig,
	StateMachine,
	StateNode,
	StateSchema,
	Typestate,
} from 'xstate'

import {
	ADD_CONSTRAINT,
	APPLY_CONSTRAINT,
	REMOVE_CONSTRAINT,
	RESET_LOCAL_CONSTRAINT,
} from './components/Constraints/actions'
import { LOCK_ALL_CONSTRAINTS, RESET_ALL_CONSTRAINTS } from './globalActions'

interface UseMachineOptions<TContext, TEvent extends EventObject> {
	/**
	 * If provided, will be merged with machine's `context`.
	 */
	context?: Partial<TContext>
	/**
	 * If `true`, service will start immediately (before mount).
	 */
	immediate: boolean
	/**
	 * The state to rehydrate the machine to. The machine will
	 * start at this state instead of its `initialState`.
	 */
	state?: StateConfig<TContext, TEvent>
}

export type UseMachineBus = <TContext, TEvent extends EventObject>(
	machine: StateMachine<TContext, any, TEvent>,
	options?: Partial<InterpreterOptions> &
		Partial<UseMachineOptions<TContext, TEvent>> &
		Partial<MachineOptions<TContext, TEvent>>
) => [State<TContext, TEvent>, SendToBusWrapper, Interpreter<TContext, any, TEvent>]

type MachineFactoryOptions = {
	id: string
	initial?:
		| 'noConstraintsSet'
		| 'constraintsUpdated'
		| 'constraintsApplied'
		| 'constraintLimitReached'
}

export interface ConstraintSchema extends StateSchema {
	states: {
		noConstraintsSet: {}
		constraintsUpdated: {}
		constraintsApplied: {}
		constraintLimitReached: {}
	}
}

export type ConstraintMachineConfig = MachineConfig<
	ConstraintContext,
	ConstraintSchema,
	ConstraintEvents
>

type ConstraintTypeState = Typestate<ConstraintContext>

export type ConstraintStateMachine =
	| StateMachine<ConstraintContext, ConstraintSchema, ConstraintEvents, ConstraintTypeState>
	| StateNode<ConstraintContext, any, ConstraintEvents, any>

export type SendToBusWrapper = (
	event: ConstraintEvents,
	payload?: EventData | undefined
) => State<ConstraintContext, ConstraintEvents, ConstraintSchema, ConstraintTypeState> | void

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

type ServiceContextTypes = 'constraints' | 'queryController'

export type ConstraintService = Interpreter<ConstraintContext, any, ConstraintEvents, any>
export type UseServiceContext = (
	serviceRequested: ServiceContextTypes
) => [ConstraintService['state'], ConstraintService['send']]
