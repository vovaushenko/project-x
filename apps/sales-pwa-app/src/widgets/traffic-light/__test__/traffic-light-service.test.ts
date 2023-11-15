import { describe, it, expect, beforeAll, beforeEach, afterEach } from 'vitest';
import { TrafficLightContext, trafficLightService } from '../service/traffic-light.service';

describe('Traffic light service', () => {
  const service = trafficLightService.start();
  let trafficLightContext: TrafficLightContext;
  let currentState: any;

  beforeEach(() => {
    service.start();
    service.subscribe((state) => {
      trafficLightContext = state.context;
      currentState = state;
    });
  });
  afterEach(() => {
    service.stop();
  });

  it('should start in idle state', () => {
    expect(trafficLightContext.light).toBeNull();
    expect(currentState.value).toBe('idle');
  });

  it('should initialize to red when activated', () => {
    service.send('ACTIVATE');
    expect(trafficLightContext.light).toBe('red');
    expect(currentState.value).toEqual({ active: 'red' });
  });

  it('should change to green when red', () => {
    service.send('ACTIVATE');
    service.send('CHANGE_LIGHT');
    expect(currentState.value).toEqual({ active: 'green' });
  });

  it('should change to yellow when green', () => {
    service.send('ACTIVATE');
    expect(currentState.value).toEqual({ active: 'red' });
    service.send('CHANGE_LIGHT');
    expect(currentState.value).toEqual({ active: 'green' });
    service.send('CHANGE_LIGHT');
    expect(currentState.value).toEqual({ active: 'yellow' });
  });
});
