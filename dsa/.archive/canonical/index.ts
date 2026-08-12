
type PhysicalMemoryCRUD =
  | "Allocate"    // Create: Reserve a block of memory addresses
  | "Read"        // Read:   Fetch value/data from an address
  | "Write"       // Update: Store value/address into a memory location
  | "Deallocate"; // Delete: Release a previously reserved block of memory

