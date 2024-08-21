const setsData = [
    {
      name: 'c1fa-set1',
      coordinates: [[-19.5759306, 147.3085443], [-19.5763669, 147.3085083], [-19.576442, 147.309018], [-19.5738569, 147.309299], [-19.5744596, 147.3091785], [-19.5749966, 147.3090017], [-19.5754109, 147.3088465], [-19.5756734, 147.3087131], [-19.5759306, 147.3085443]],
    },
    {
      name: 'c1fa-set2',
      coordinates: [[-19.576442, 147.309018], [-19.576544, 147.309902], [-19.569991, 147.310641], [-19.569924, 147.310022], [-19.569991, 147.3097126], [-19.576442, 147.309018]],
    },
    {
      name: 'c1fa-set3',
      coordinates: [[-19.57663, 147.310775], [-19.570082, 147.3115], [-19.569991, 147.310642], [-19.576543, 147.309901], [-19.576487, 147.310217], [-19.57658, 147.310362], [-19.57663, 147.310775]],
    },
    {
      name: 'c1fa-set4',
      coordinates: [[-19.576738, 147.311664], [-19.570178, 147.312403], [-19.570081, 147.3115], [-19.57663, 147.310775], [-19.576738, 147.311664]],
    },
    {
      name: 'c1fa-set5',
      coordinates: [[-19.576738, 147.311664], [-19.576796, 147.312146], [-19.576731, 147.312156], [-19.576831, 147.312562], [-19.570271, 147.313275], [-19.570178, 147.312403], [-19.576738, 147.311664]],
    },
    {
      name: 'c1fa-set6',
      coordinates: [[-19.577305, 147.313446], [-19.57033, 147.31419], [-19.570254, 147.313325], [-19.576894, 147.312593], [-19.577051, 147.312909], [-19.577077, 147.313126], [-19.577213, 147.313253], [-19.577305, 147.313446]],
    },
    {
      name: 'c1fa-set7',
      coordinates: [[-19.577676, 147.314292], [-19.570408, 147.315062], [-19.570331, 147.314191], [-19.577305, 147.313446], [-19.57766, 147.314192], [-19.577676, 147.314292]],
    },
    {
      name: 'c1fa-set8',
      coordinates: [[-19.577676, 147.314292], [-19.577684, 147.314339], [-19.577894, 147.314825], [-19.577919, 147.314932], [-19.57792, 147.315015], [-19.570473, 147.315807], [-19.570407, 147.315062], [-19.577676, 147.314292]],
    },
    {
      name: 'c1fa-set9',
      coordinates: [[-19.57792, 147.315015], [-19.577921, 147.315078], [-19.577689, 147.31577], [-19.570543, 147.316609], [-19.570473, 147.315807], [-19.57792, 147.315015]],
    },
    {
      name: 'c1fa-set10',
      coordinates: [[-19.5705519, 147.3166574], [-19.577685, 147.315863], [-19.577527, 147.316312], [-19.570592, 147.31714], [-19.5705519, 147.3166574]],
    },
    {
      name: 'c1fa-set11',
      coordinates: [[-19.577527, 147.316311], [-19.577216, 147.317194], [-19.570659, 147.317981], [-19.570592, 147.31714], [-19.577527, 147.316311]],
    },
    {
      name: 'c1fa-set12',
      coordinates: [[-19.577216, 147.317194], [-19.577127, 147.317447], [-19.576987, 147.317577], [-19.576997, 147.317816], [-19.576897, 147.318085], [-19.570728, 147.318833], [-19.570659, 147.317981], [-19.577216, 147.317194]],
    },
    {
      name: 'c1fa-set13',
      coordinates: [[-19.576897, 147.318085], [-19.576557, 147.319003], [-19.5708001, 147.3196194], [-19.570728, 147.318833], [-19.576897, 147.318085]],
    },
    {
      name: 'c1fa-set14',
      coordinates: [[-19.576519, 147.319128], [-19.575962, 147.3204706], [-19.575216, 147.320539], [-19.5745013, 147.3192953], [-19.5765008, 147.3190615], [-19.5765352, 147.3190894], [-19.576519, 147.319128]],
    },
  ];
  
  class Set {
    constructor(name, label, type, duration, irrigationStatus, sequence, valves, pumps, wlSensors) {
      this.name = name;
      this.label = label;
      this.type = type;
      this.duration = duration;
      this.irrigationStatus = irrigationStatus;
      this.sequence = sequence;
      this.valves = valves;
      this.pumps = pumps;
      this.wlSensors = wlSensors;
      this.selected = false;
      this.duration = 0;
      this.progress = 0;
    }
  }
  
  const sets = {
    "c1fa-set1": new Set("c1fa-set1", "Set 1", "irrigation set", 10, "off", "sequence4", ["c1fa-valve5-w"], ["c1fa-pump1"], ["c1fa-was1"]),   // name, label, type, duration, irrigationStatus, sequence, valves, pumps, wlSensors
    "c1fa-set2": new Set("c1fa-set2", "Set 2", "irrigation set", 10, "off", "sequence2", ["c1fa-valve5-e", "c1fa-valve4-w"], ["c1fa-pump1", "c1fa-pump2"], ["c1fa-was2"]),
    "c1fa-set3": new Set("c1fa-set3", "Set 3", "irrigation set", 10, "off", "sequence2", ["c1fa-valve4-e", "c1fa-valve3-w"], ["c1fa-pump1", "c1fa-pump2"], ["c1fa-was3"]),
    "c1fa-set4": new Set("c1fa-set4", "Set 4", "irrigation set", 10, "off", "sequence2", ["c1fa-valve3-e", "c1fa-valve2-w"], ["c1fa-pump1", "c1fa-pump2"], ["c1fa-was4"]),
    "c1fa-set5": new Set("c1fa-set5", "Set 5", "irrigation set", 10, "off", "sequence2", ["c1fa-valve2-e", "c1fa-valve1-w"], ["c1fa-pump1", "c1fa-pump2"], ["c1fa-was5"]),
    "c1fa-set6": new Set("c1fa-set6", "Set 6", "irrigation set", 10, "off", "sequence2", ["c1fa-valve6-w"], ["c1fa-pump1", "c1fa-pump2"], ["c1fa-was6"]),
    "c1fa-set7": new Set("c1fa-set7", "Set 7", "irrigation set", 10, "off", "sequence1", ["c1fa-valve6-e", "c1fa-valve7-w"], ["c1fa-pump2", "c1fa-pump3"], ["c1fa-was7"]),
    "c1fa-set8": new Set("c1fa-set8", "Set 8", "irrigation set", 10, "off", "sequence3", ["c1fa-valve7-e", "c1fa-valve8-w"], ["c1fa-pump3", "c1fa-pump4"], ["c1fa-was8"]),
    "c1fa-set9": new Set("c1fa-set9", "Set 9", "irrigation set", 10, "off", "sequence3", ["c1fa-valve8-e", "c1fa-valve9-e"], ["c1fa-pump3", "c1fa-pump4"], ["c1fa-was9"]),
    "c1fa-set10": new Set("c1fa-set10", "Set 10", "irrigation set", 10, "off", "sequence3", ["c1fa-valve10-w"], ["c1fa-pump3", "c1fa-pump4"], ["c1fa-was10"]),
    "c1fa-set11": new Set("c1fa-set11", "Set 11", "irrigation set", 10, "off", "sequence3", ["c1fa-valve10-e"], ["c1fa-pump3", "c1fa-pump4"], ["c1fa-was11"]),
    "c1fa-set12": new Set("c1fa-set12", "Set 12", "irrigation set", 10, "off", "sequence3", ["c1fa-valve11-e"], ["c1fa-pump3", "c1fa-pump4"], ["c1fa-was12"]),
    "c1fa-set13": new Set("c1fa-set13", "Set 13", "irrigation set", 10, "off", "sequence3", ["c1fa-valve12-e"], ["c1fa-pump3", "c1fa-pump4"], ["c1fa-was13"]),
    "c1fa-set14": new Set("c1fa-set14", "Set 14", "irrigation set", 10, "off", "sequence5", ["c1fa-valve13-e"], ["c1fa-pump4"], ["c1fa-was14"])
  };

// Device Data
// Define device classes
class Device {
    constructor(name, label, type, lat, long, status) {
      this.name = name;
      this.label = label;
      this.type = type;
      this.lat = lat;
      this.long = long;
      this.status = status;
    }
  }
  
  class Pump extends Device {
    constructor(name, label, type, lat, long, status, sequences, toRelations) {
      super(name, label, type, lat, long, status);
      this.sequences = sequences;
      this.toRelations = toRelations;
    }
  }
  
  class WLSensor extends Device {
    constructor(name, label, type, lat, long, status, toRelations) {
      super(name, label, type, lat, long, status);
      this.toRelations = toRelations;
    }
  }
  
  class Valve extends Device {
    constructor(name, label, type, lat, long, status, toRelations) {
      super(name, label, type, lat, long, status);
      this.toRelations = toRelations;
    }
  }
  
  // Instantiate devices
  const pumps = {
    "c1fa-pump1": new Pump("c1fa-pump1", "Pump 1", "pump", -19.576565, 147.310215, "off", ["sequence2", "sequence4"], ["c1fa"]),   // name, label, type, lat, long, status, sequences, toRelations
    "c1fa-pump2": new Pump("c1fa-pump2", "Pump 2", "pump", -19.577155, 147.313087, "off", ["sequence1", "sequence2"], ["c1fa"]),
    "c1fa-pump3": new Pump("c1fa-pump3", "Pump 3", "pump", -19.5776455, 147.3141453, "off", ["sequence3", "sequence3"], ["c1fa"]),
    "c1fa-pump4": new Pump("c1fa-pump4", "Pump 4", "pump", -19.577057, 147.317569, "off", ["sequence3", "sequence5"], ["c1fa"])
  };
  
  const wlsensors = {
    "c1fa-was1": new WLSensor("c1fa-was1", "wl-sensor1", "water alert sensor", -19.575590, 147.3087600, "Dry", ['c1fa-set1']),    // name, label, type, lat, long, status, toRelations
    "c1fa-was2": new WLSensor("c1fa-was2", "wl-sensor2", "water alert sensor", -19.569946, 147.3101766, "Dry", ['c1fa-set2']),
    "c1fa-was3": new WLSensor("c1fa-was3", "wl-sensor3", "water alert sensor", -19.5700269, 147.3110885, "Dry", ['c1fa-set3']),
    "c1fa-was4": new WLSensor("c1fa-was4", "wl-sensor4", "water alert sensor", -19.570128, 147.3119468, "Dry", ['c1fa-set4']),
    "c1fa-was5": new WLSensor("c1fa-was5", "wl-sensor5", "water alert sensor", -19.5702291, 147.312891, "Dry", ['c1fa-set5']),
    "c1fa-was6": new WLSensor("c1fa-was6", "wl-sensor6", "water alert sensor", -19.570301, 147.313817, "Dry", ['c1fa-set6']),
    "c1fa-was7": new WLSensor("c1fa-was7", "wl-sensor7", "water alert sensor", -19.570368, 147.314682, "Dry", ['c1fa-set7']),
    "c1fa-was8": new WLSensor("c1fa-was8", "wl-sensor8", "water alert sensor", -19.5704212, 147.3154337, "Dry", ['c1fa-set8']),
    "c1fa-was9": new WLSensor("c1fa-was9", "wl-sensor9", "water alert sensor", -19.5704919, 147.3161954, "Dry", ['c1fa-set9']),
    "c1fa-was10": new WLSensor("c1fa-was10", "wl-sensor10", "water alert sensor", -19.5705526, 147.3168928, "Dry", ['c1fa-set10']),
    "c1fa-was11": new WLSensor("c1fa-was11", "wl-sensor11", "water alert sensor", -19.5705829, 147.3175473, "Dry", ['c1fa-set11']),
    "c1fa-was12": new WLSensor("c1fa-was12", "wl-sensor12", "water alert sensor", -19.5706638, 147.318427, "Dry", ['c1fa-set12']),
    "c1fa-was13": new WLSensor("c1fa-was13", "wl-sensor13", "water alert sensor", -19.5707244, 147.319221, "Dry", ['c1fa-set13']),
    "c1fa-was14": new WLSensor("c1fa-was14", "wl-sensor14", "water alert sensor", -19.5748489, 147.3199183, "Dry", ['c1fa-set14'])
  };
  
  const valves = {
    "c1fa-valve5-w": new Valve("c1fa-valve5-w", "HW1-5-west", "valve", -19.576446, 147.309009, "off", ["c1fa-set1"]),   // name, label, type, lat, long, status, toRelations
    "c1fa-valve5-e": new Valve("c1fa-valve5-e", "HW1-5-east", "valve", -19.576446, 147.309009, "off", ["c1fa-set2"]),
    "c1fa-valve4-w": new Valve("c1fa-valve4-w", "HW1-4-west", "valve", -19.576551, 147.309899, "off", ["c1fa-set2"]),
    "c1fa-valve4-e": new Valve("c1fa-valve4-e", "HW1-4-east", "valve", -19.576551, 147.309899, "off", ["c1fa-set3"]),
    "c1fa-valve3-w": new Valve("c1fa-valve3-w", "HW1-3-west", "valve", -19.576651, 147.31077, "off", ["c1fa-set3"]),
    "c1fa-valve3-e": new Valve("c1fa-valve3-e", "HW1-3-east", "valve", -19.576651, 147.31077, "off", ["c1fa-set4"]),
    "c1fa-valve2-w": new Valve("c1fa-valve2-w", "HW1-2-west", "valve", -19.576757, 147.311664, "off", ["c1fa-set4"]),
    "c1fa-valve2-e": new Valve("c1fa-valve2-e", "HW1-2-east", "valve", -19.576757, 147.311664, "off", ["c1fa-set5"]),
    "c1fa-valve1-w": new Valve("c1fa-valve1-w", "HW1-1-west", "valve", -19.576853, 147.312555, "off", ["c1fa-set5"]),
    "c1fa-valve6-w": new Valve("c1fa-valve6-w", "HW2-1-west", "valve", -19.577325, 147.313441, "off", ["c1fa-set6"]),
    "c1fa-valve6-e": new Valve("c1fa-valve6-e", "HW2-1-east", "valve", -19.577325, 147.313441, "off", ["c1fa-set7"]),
    "c1fa-valve7-w": new Valve("c1fa-valve7-w", "HW2-2-west", "valve", -19.5777175, 147.3143739, "off", ["c1fa-set7"]),
    "c1fa-valve7-e": new Valve("c1fa-valve7-e", "HW2-2-east", "valve", -19.5777175, 147.3143739, "off", ["c1fa-set8"]),
    "c1fa-valve8-w": new Valve("c1fa-valve8-w", "HW2-3-west", "valve", -19.577926, 147.315014, "off", ["c1fa-set8"]),
    "c1fa-valve8-e": new Valve("c1fa-valve8-e", "HW2-3-east", "valve", -19.577926, 147.315014, "off", ["c1fa-set9"]),
    "c1fa-valve9-e": new Valve("c1fa-valve9-e", "HW2-4-east", "valve", -19.577836, 147.315373, "off", ["c1fa-set9"]),
    "c1fa-valve10-w": new Valve("c1fa-valve10-w", "HW3-1-west", "valve", -19.577519, 147.316314, "off", ["c1fa-set10"]),
    "c1fa-valve10-e": new Valve("c1fa-valve10-e", "HW3-1-east", "valve", -19.577519, 147.316314, "off", ["c1fa-set11"]),
    "c1fa-valve11-e": new Valve("c1fa-valve11-e", "HW3-2-east", "valve", -19.577221, 147.317197, "off", ["c1fa-set12"]),
    "c1fa-valve12-e": new Valve("c1fa-valve12-e", "HW3-3-east", "valve", -19.576906, 147.318083, "off", ["c1fa-set13"]),
    "c1fa-valve13-e": new Valve("c1fa-valve13-e", "HW4-1-east", "valve", -19.5765265, 147.3191342, "off", ["c1fa-set14"]),
  };
  
  // Add devices to the map
  const devices = { ...pumps, ...wlsensors, ...valves };


  // Irrigation Info & Sequences Data
  const all_sequences = ["root", "sequence1", "sequence2", "sequence3", "sequence4", "sequence5"];

const sequences = {
  root: {
    children: ["sequence1"],
    pumps: [],
    sets: [],
    curr_set_idx: 0,
    completed: false
  },
  sequence1: {
    sets: ["c1fa-set7"],
    pumps: ["c1fa-pump2", "c1fa-pump3"],
    children: ["sequence2", "sequence3"],
    parent: "root",
    curr_set_idx: 0,
    completed: false
  },
  sequence2: {
    sets: ["c1fa-set6", "c1fa-set5", "c1fa-set4", "c1fa-set3", "c1fa-set2"],
    pumps: ["c1fa-pump1", "c1fa-pump2"],
    children: ["sequence4"],
    parent: "sequence1",
    curr_set_idx: 0,
    completed: false
  },
  sequence3: {
    sets: ["c1fa-set8", "c1fa-set9", "c1fa-set10", "c1fa-set11", "c1fa-set12", "c1fa-set13"],
    pumps: ["c1fa-pump3", "c1fa-pump4"],
    children: ["sequence5"],
    parent: "sequence1",
    curr_set_idx: 0,
    completed: false
  },
  sequence4: {
    sets: ["c1fa-set1"],
    pumps: ["c1fa-pump1"],
    children: [],
    parent: "sequence2",
    curr_set_idx: 0,
    completed: false
  },
  sequence5: {
    sets: ["c1fa-set14"],
    pumps: ["c1fa-pump4"],
    children: [],
    parent: "sequence3",
    curr_set_idx: 0,
    completed: false
  }
};