import { TextbookChunk } from '../types';

export const SAMPLE_TEXTBOOK_CHUNKS: TextbookChunk[] = [
  {
    id: 'cn-chunk-01',
    title: 'OSI Reference Model Architecture & Layers',
    topic: 'Computer Networks',
    source: 'OpenStax Computer Networking & Kurose-Ross',
    page: 42,
    bloomsTarget: ['remember', 'understand', 'analyze'],
    tags: ['OSI Model', 'Physical Layer', 'Data Link', 'TCP/IP', 'Sniffing'],
    content: `The Open Systems Interconnection (OSI) model conceptualizes network communications across seven distinct abstraction layers:
1. Physical Layer: Transmits raw bit streams over physical media (cables, fiber, wireless).
2. Data Link Layer: Node-to-node data transfer, MAC addressing, framing, and error detection (e.g. Ethernet, CRC). Note: IEEE 802 Ethernet adds preamble bits at the physical layer, which are not part of the data link frame header.
3. Network Layer: Host-to-host routing and packet addressing using IP addresses (IPv4/IPv6). Sniffers on intermediate routers (e.g. R2 between source Q and destination H) can observe unencrypted IP header addresses and TCP port numbers.
4. Transport Layer: End-to-end communication, segmentation, flow control, and reliability (TCP/UDP).
5. Session Layer: Manages sessions, key exchange, and checkpointing. When session layer encryption (such as DES or TLS session encryption) is applied, payload data (like full HTTP request URLs) is encrypted, while lower layer headers (IP addresses, TCP ports, MAC addresses) remain visible to sniffers at intermediate nodes.
6. Presentation Layer: Data translation, data compression, and encryption standard formatting.
7. Application Layer: End-user protocols including HTTP, HTTPS, FTP, DNS, and SMTP.`
  },
  {
    id: 'cn-chunk-02',
    title: 'Transmission Media, NRZ, and Bandwidth Calculation',
    topic: 'Computer Networks',
    source: 'Tanenbaum Computer Networks (5th Ed)',
    page: 118,
    bloomsTarget: ['understand', 'apply', 'evaluate'],
    tags: ['NRZ Encoding', 'UTP', 'SAN Switch', 'Bit Rate', 'Satellite Delay'],
    content: `Signal encoding and transmission characteristics dictate network throughput:
- Non-Return-to-Zero (NRZ) Encoding: Requires constant signal level (high or low) to send identical bit sequences (e.g., all 1s or all 0s). NRZ does not self-clock, making long runs of identical bits susceptible to clock synchronization drift.
- Unshielded Twisted Pair (UTP): Common copper cabling (Cat5e/Cat6) used for LAN connections due to cost-effectiveness and flexibility against crosstalk interference.
- Satellite Channel Delay & Propagation: A satellite link with 500 ms round-trip propagation delay (250 ms one-way) and 50 kbps transmission rate transmitting a 1000-bit frame takes: Transmission Time = 1000 bits / 50,000 bps = 20 ms. Total reception time = 250 ms + 20 ms = 270 ms.
- Aggregate SAN Switch Bandwidth: A Fiber Channel SAN switch with 24 ports running at 8 Gbps full-duplex per port has an aggregate bandwidth of 24 * 8 Gbps = 192 Gbps (or 384 Gbps full-duplex aggregate capacity).`
  },
  {
    id: 'os-chunk-01',
    title: 'Process Management, Deadlocks, and CPU Scheduling',
    topic: 'Operating System',
    source: 'Silberschatz Operating System Concepts (10th Ed)',
    page: 154,
    bloomsTarget: ['remember', 'understand', 'apply', 'analyze'],
    tags: ['Deadlock', 'Bankers Algorithm', 'Round Robin', 'Process State', 'Mutex'],
    content: `An Operating System manages hardware resources and process execution state transitions:
1. Process States: New -> Ready -> Running -> Waiting (Blocked) -> Terminated. Context switching saves process control block (PCB) state into memory.
2. Deadlock Characterization: Occurs when 4 Coffman conditions hold simultaneously:
   - Mutual Exclusion: At least one resource held in non-shareable mode.
   - Hold and Wait: Process holding resources requests additional resources.
   - No Preemption: Resources cannot be forcibly taken from a process.
   - Circular Wait: Closed chain of processes exists where each holds resources needed by the next.
3. Banker's Algorithm: Uses Allocation, Max, Available, and Need matrices (Need = Max - Allocation) to verify whether allocating requested resources leaves the system in a Safe State.`
  },
  {
    id: 'os-chunk-02',
    title: 'Virtual Memory, Paging, and Page Replacement Algorithms',
    topic: 'Operating System',
    source: 'Silberschatz Operating System Concepts',
    page: 310,
    bloomsTarget: ['apply', 'analyze', 'evaluate'],
    tags: ['Paging', 'TLB', 'FIFO', 'LRU', 'Beladys Anomaly'],
    content: `Virtual Memory maps logical process addresses to physical memory frames via page tables:
- Translation Lookaside Buffer (TLB): High-speed hardware cache storing recent logical-to-physical frame mappings. Effective Access Time (EAT) = Hit_rate * (TLB_access + RAM_access) + (1 - Hit_rate) * (TLB_access + 2 * RAM_access).
- Page Fault: Occurs when a page table entry valid bit is 0, requiring secondary storage fetch.
- Page Replacement Algorithms:
  * FIFO (First-In, First-Out): Replaces oldest page. Subject to Belady's Anomaly where increasing allocated page frames increases page faults.
  * LRU (Least Recently Used): Replaces page unused for longest time duration. Stack algorithm immune to Belady's Anomaly.
  * Optimal (OPT): Replaces page that will not be used for longest future duration.`
  },
  {
    id: 'ds-chunk-01',
    title: 'Binary Search Trees, AVL Trees, and Graph Traversal',
    topic: 'Programming and Data Structure',
    source: 'Cormen Introduction to Algorithms (CLRS)',
    page: 289,
    bloomsTarget: ['remember', 'apply', 'analyze', 'create'],
    tags: ['BST', 'AVL Tree', 'BFS', 'DFS', 'Dijkstra', 'Time Complexity'],
    content: `Data structures organize data for efficient insertion, deletion, and retrieval:
- Binary Search Tree (BST): Left subtree keys < Node key < Right subtree keys. In-order traversal yields elements in sorted ascending order. Worst-case search height is O(N) for skewed trees.
- Self-Balancing AVL Trees: Enforce height balance factor |Height(Left) - Height(Right)| <= 1 at every node via single (LL, RR) or double (LR, RL) rotations, guaranteeing O(log N) operations.
- Graph Algorithms:
  * Breadth-First Search (BFS): Queue-based O(V + E) algorithm for unweighted shortest paths.
  * Depth-First Search (DFS): Stack/recursion-based O(V + E) traversal using discovery and finishing timestamps.
  * Dijkstra's Algorithm: Greedy priority queue implementation solving single-source shortest path on non-negative weighted graphs in O((V + E) log V).`
  },
  {
    id: 'math-chunk-01',
    title: 'Linear Algebra, Eigenvalues, and Probability Distributions',
    topic: 'Mathematics',
    source: 'Gilbert Strang Linear Algebra & Kreyszig',
    page: 195,
    bloomsTarget: ['understand', 'apply', 'evaluate'],
    tags: ['Matrix', 'Eigenvalues', 'Determinant', 'Poisson', 'Bayes Theorem'],
    content: `Fundamental mathematical concepts applied in computer science and machine learning:
- Eigenvalues & Eigenvectors: For matrix A, vector v is an eigenvector with eigenvalue lambda if A*v = lambda*v. Found by solving det(A - lambda*I) = 0.
- Matrix Properties: The trace of matrix A equals the sum of its eigenvalues, and det(A) equals the product of its eigenvalues.
- Bayes' Theorem: P(A|B) = [P(B|A) * P(A)] / P(B). Used in probabilistic reasoning and classification.
- Poisson Distribution: Models count of independent events in fixed interval: P(X = k) = (lambda^k * e^-lambda) / k!. Mean = Variance = lambda.`
  },
  {
    id: 'coa-chunk-01',
    title: 'CPU Cache Organization, Pipelining, and Instruction Sets',
    topic: 'Computer Organization and Architecture',
    source: 'Patterson & Hennessy Computer Organization',
    page: 210,
    bloomsTarget: ['remember', 'understand', 'analyze'],
    tags: ['Cache', 'Direct Mapping', 'Pipeline Hazards', 'RISC', 'Instruction Set'],
    content: `Computer Architecture structures execution units, memory hierarchy, and pipeline stages:
- Memory Hierarchy: Registers -> L1 Cache -> L2 Cache -> L3 Cache -> Main Memory (DRAM) -> Secondary Storage.
- Cache Mapping Schemes:
  1. Direct Mapped: Memory block maps to exact cache line (Block % Cache Lines).
  2. Set Associative: Block maps to any line in a specific set, reducing conflict misses.
  3. Fully Associative: Block maps to any available cache line.
- Pipelining Hazards:
  * Structural Hazard: Hardware resource conflict.
  * Data Hazard: Dependency on unwritten result (RAW, WAR, WAW), mitigated via operand forwarding/bypassing.
  * Control Hazard: Branch decision uncertainty, mitigated via branch prediction.`
  },
  {
    id: 'toc-chunk-01',
    title: 'Finite Automata, Context-Free Grammars, and Turing Machines',
    topic: 'Theory of Computation',
    source: 'Michael Sipser Theory of Computation (3rd Ed)',
    page: 140,
    bloomsTarget: ['remember', 'understand', 'apply', 'analyze'],
    tags: ['DFA', 'NFA', 'CFG', 'Pumping Lemma', 'Turing Machine', 'Decidability'],
    content: `Chomsky Hierarchy defines language classes and corresponding computing machines:
1. Regular Languages (Type 3): Accepted by Deterministic/Nondeterministic Finite Automata (DFA/NFA). Expressible via Regular Expressions. Proven non-regular via Pumping Lemma.
2. Context-Free Languages (Type 2): Accepted by Pushdown Automata (PDA) using a stack. Generated by Context-Free Grammars (CFG).
3. Context-Sensitive Languages (Type 1): Accepted by Linear Bounded Automata.
4. Recursively Enumerable Languages (Type 0): Accepted by Turing Machines. Halting Problem is undecidable on Turing Machines.`
  }
];
