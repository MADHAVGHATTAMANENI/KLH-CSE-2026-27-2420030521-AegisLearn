import { Question, BloomsLevel } from '../types';

export const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 'q-cn-01',
    topic: 'Computer Networks',
    question: 'In the following pairs of OSI protocol layer/sub-layer and its functionality, which is the INCORRECT pair?',
    options: [
      'Data Link Layer - Node-to-node delivery & framing',
      'Network Layer - End-to-end delivery of packet across multiple networks',
      'Transport Layer - Session encryption & DES sharing key management',
      'Physical Layer - Transmission of raw bit stream over physical medium'
    ],
    correctAnswer: 2,
    bloomsLevel: 'understand',
    explanation: 'Session encryption and key management belong to the Session/Presentation layers, NOT the Transport Layer. Transport layer provides process-to-process flow and error control.',
    contextChunkId: 'cn-chunk-01'
  },
  {
    id: 'q-cn-02',
    topic: 'Computer Networks',
    question: 'An IP machine Q has a path to another IP machine H via three IP routers R1, R2, and R3 (Q---R1---R2---R3---H). H acts as an HTTP server. Session layer encryption is used with DES as shared key encryption protocol. Which of the following pieces of information can an intruder learn through sniffing at R2 alone?\n[I1] The URL of the file downloaded\n[I2] The TCP port numbers at Q and H\n[I3] The IP addresses of Q and H\n[I4] The link layer addresses of Q and H',
    options: [
      'I1, I2, I3, and I4',
      'I2 and I3 only',
      'I2, I3, and I4 only',
      'I1 and I4 only'
    ],
    correctAnswer: 1,
    bloomsLevel: 'analyze',
    explanation: 'Since session layer encryption is used, the HTTP request URL (I1) is encrypted payload. Link layer MAC addresses (I4) change hop-by-hop (R2 sees MAC of R1 and R3, not Q and H). However, IP header addresses (I3) and TCP header port numbers (I2) remain unencrypted and visible at router R2.',
    contextChunkId: 'cn-chunk-01'
  },
  {
    id: 'q-cn-03',
    topic: 'Computer Networks',
    question: 'To send the same consecutive bit sequence, Non-Return-to-Zero (NRZ) encoding requires:',
    options: [
      'Constant voltage signal level without transitions',
      'Mid-bit transition for clocking',
      'Manchester differential phase shift',
      'Preamble bit stuffing after every 5 bits'
    ],
    correctAnswer: 0,
    bloomsLevel: 'remember',
    explanation: 'NRZ encoding maintains a constant high or low voltage level for identical consecutive bits, which requires no transitions but leads to clock synchronization loss over long identical sequences.',
    contextChunkId: 'cn-chunk-02'
  },
  {
    id: 'q-cn-04',
    topic: 'Computer Networks',
    question: 'If there are n devices (nodes) in a network, what is the number of cable links required for a fully connected mesh topology and a star topology respectively?',
    options: [
      'n(n-1)/2 and n-1',
      'n(n-1) and n',
      'n-1 and n(n-1)/2',
      'n^2 and 2n'
    ],
    correctAnswer: 0,
    bloomsLevel: 'apply',
    explanation: 'For a fully connected mesh network, each node connects to (n-1) other nodes, leading to n(n-1)/2 duplex links. For a star topology, each of the n nodes connects directly to a central hub via 1 link (total n-1 or n links).',
    contextChunkId: 'cn-chunk-02'
  },
  {
    id: 'q-os-01',
    topic: 'Operating System',
    question: 'Which of the following conditions is NOT a necessary condition for a deadlock to occur in an operating system?',
    options: [
      'Mutual Exclusion',
      'Hold and Wait',
      'Preemption of resources by kernel priority',
      'Circular Wait'
    ],
    correctAnswer: 2,
    bloomsLevel: 'remember',
    explanation: 'NO Preemption is the required condition for deadlock. If preemption is allowed, deadlocks cannot occur because resources can be reclaimed.',
    contextChunkId: 'os-chunk-01'
  },
  {
    id: 'q-os-02',
    topic: 'Operating System',
    question: 'Consider a paging system with a TLB hit ratio of 90%. Accessing the TLB takes 10 ns, and accessing main memory takes 100 ns. What is the Effective Access Time (EAT)?',
    options: [
      '110 ns',
      '120 ns',
      '130 ns',
      '210 ns'
    ],
    correctAnswer: 1,
    bloomsLevel: 'apply',
    explanation: 'TLB Hit access = 10 ns (TLB) + 100 ns (RAM) = 110 ns. TLB Miss access = 10 ns (TLB) + 100 ns (Page table RAM) + 100 ns (Frame RAM) = 210 ns. EAT = 0.90 * 110 + 0.10 * 210 = 99 + 21 = 120 ns.',
    contextChunkId: 'os-chunk-02'
  },
  {
    id: 'q-ds-01',
    topic: 'Programming and Data Structure',
    question: 'What traversal of a Binary Search Tree (BST) produces the elements in sorted ascending order?',
    options: [
      'Pre-order Traversal',
      'In-order Traversal',
      'Post-order Traversal',
      'Level-order Traversal'
    ],
    correctAnswer: 1,
    bloomsLevel: 'remember',
    explanation: 'In-order traversal visits (Left Subtree -> Root -> Right Subtree). By BST property (Left < Root < Right), this yields strictly sorted values.',
    contextChunkId: 'ds-chunk-01'
  },
  {
    id: 'q-ds-02',
    topic: 'Programming and Data Structure',
    question: 'What is the tightest worst-case time complexity of Dijkstra shortest path algorithm using a Min-Binary Heap on a graph with V vertices and E edges?',
    options: [
      'O(V^2)',
      'O((V + E) log V)',
      'O(V * E)',
      'O(E^2 log V)'
    ],
    correctAnswer: 1,
    bloomsLevel: 'apply',
    explanation: 'Extracting min vertex takes O(V log V) and decreasing key for edges takes O(E log V), yielding total running time O((V + E) log V).',
    contextChunkId: 'ds-chunk-01'
  },
  {
    id: 'q-math-01',
    topic: 'Mathematics',
    question: 'If matrix A has eigenvalues 2, 3, and -5, what is the determinant of matrix A?',
    options: [
      '0',
      '10',
      '-30',
      '30'
    ],
    correctAnswer: 2,
    bloomsLevel: 'apply',
    explanation: 'The determinant of a matrix equals the product of all its eigenvalues: det(A) = 2 * 3 * (-5) = -30.',
    contextChunkId: 'math-chunk-01'
  },
  {
    id: 'q-coa-01',
    topic: 'Computer Organization and Architecture',
    question: 'In a CPU pipeline, a Data Hazard caused by a Read-After-Write (RAW) dependency can be hardware-mitigated without stalling using:',
    options: [
      'Operand Forwarding (Bypassing)',
      'Branch History Table',
      'Cache Line Invalidation',
      'Delayed Branching Slot'
    ],
    correctAnswer: 0,
    bloomsLevel: 'understand',
    explanation: 'Operand Forwarding routes result data directly from the ALU output back to pipeline input registers before it is written back to the register file.',
    contextChunkId: 'coa-chunk-01'
  },
  {
    id: 'q-toc-01',
    topic: 'Theory of Computation',
    question: 'Which of the following language classes in the Chomsky Hierarchy is accepted by a Pushdown Automaton (PDA)?',
    options: [
      'Regular Languages',
      'Context-Free Languages',
      'Context-Sensitive Languages',
      'Recursively Enumerable Languages'
    ],
    correctAnswer: 1,
    bloomsLevel: 'remember',
    explanation: 'Pushdown Automata (PDAs) possess a stack memory structure, which exactly matches the computational power of Context-Free Languages (Type 2).',
    contextChunkId: 'toc-chunk-01'
  }
];
