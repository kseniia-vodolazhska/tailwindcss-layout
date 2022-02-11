import { ComponentConfiguration } from './component-configuration.model';

export class ComponentMetadata {
  public row!: number;
  public column!: number;
  public name!: string;
  public configuration?: ComponentConfiguration;
}
