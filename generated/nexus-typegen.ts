/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  Badge: { // root type
    id?: number | null; // Int
    imageUrl?: string | null; // String
    name?: string | null; // String
  }
  BadgeInstance: { // root type
    dateEarned?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: number | null; // Int
  }
  Mutation: {};
  Query: {};
  User: { // root type
    id?: number | null; // Int
    name?: string | null; // String
    wallet?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Badge: { // field return type
    id: number | null; // Int
    imageUrl: string | null; // String
    instances: Array<NexusGenRootTypes['BadgeInstance'] | null> | null; // [BadgeInstance]
    name: string | null; // String
  }
  BadgeInstance: { // field return type
    badge: NexusGenRootTypes['Badge'] | null; // Badge
    dateEarned: NexusGenScalars['DateTime'] | null; // DateTime
    id: number | null; // Int
    user: NexusGenRootTypes['User'] | null; // User
  }
  Mutation: { // field return type
    signupUser: NexusGenRootTypes['User'] | null; // User
  }
  Query: { // field return type
    badge: NexusGenRootTypes['Badge'] | null; // Badge
    badgeInstance: NexusGenRootTypes['BadgeInstance'] | null; // BadgeInstance
    badgeInstances: Array<NexusGenRootTypes['BadgeInstance'] | null> | null; // [BadgeInstance]
    badges: Array<NexusGenRootTypes['Badge'] | null> | null; // [Badge]
    filterBadgeInstances: Array<NexusGenRootTypes['BadgeInstance'] | null> | null; // [BadgeInstance]
    users: Array<NexusGenRootTypes['User'] | null> | null; // [User]
  }
  User: { // field return type
    badges: Array<NexusGenRootTypes['BadgeInstance'] | null> | null; // [BadgeInstance]
    id: number | null; // Int
    name: string | null; // String
    wallet: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  Badge: { // field return type name
    id: 'Int'
    imageUrl: 'String'
    instances: 'BadgeInstance'
    name: 'String'
  }
  BadgeInstance: { // field return type name
    badge: 'Badge'
    dateEarned: 'DateTime'
    id: 'Int'
    user: 'User'
  }
  Mutation: { // field return type name
    signupUser: 'User'
  }
  Query: { // field return type name
    badge: 'Badge'
    badgeInstance: 'BadgeInstance'
    badgeInstances: 'BadgeInstance'
    badges: 'Badge'
    filterBadgeInstances: 'BadgeInstance'
    users: 'User'
  }
  User: { // field return type name
    badges: 'BadgeInstance'
    id: 'Int'
    name: 'String'
    wallet: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    signupUser: { // args
      name?: string | null; // String
      wallet: string; // String!
    }
  }
  Query: {
    badge: { // args
      badgeId: string; // String!
    }
    badgeInstance: { // args
      badgeInstanceId: string; // String!
    }
    badgeInstances: { // args
      userId?: string | null; // String
    }
    filterBadgeInstances: { // args
      searchString?: string | null; // String
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}