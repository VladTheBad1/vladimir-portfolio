# Brainstorming Integration Test Suite

## Test Scenarios for SAZ-Enhanced CCPM

### Test 1: Vague Input Triggers Brainstorming

**Input:**
```
"I want to build something with AI"
```

**Expected Flow:**
1. ✅ Detect vague/creative keywords ("something with")
2. ✅ Automatically trigger brainstorming-specialist
3. ✅ Generate 3-5 AI-related concepts
4. ✅ Present concepts with feasibility analysis
5. ✅ Guide user to concept selection
6. ✅ Create PRD with selected concept

**Validation Points:**
- Intent detection accuracy
- Brainstorming auto-trigger
- Concept quality and variety
- PRD includes brainstorming context

---

### Test 2: Clear Requirements Skip Brainstorming

**Input:**
```
"Create user authentication with OAuth2, MFA, and session management"
```

**Expected Flow:**
1. ✅ Detect specific technical requirements
2. ✅ Skip brainstorming
3. ✅ Direct to /pm:prd-new
4. ✅ Create comprehensive PRD
5. ✅ No brainstorming overhead

**Validation Points:**
- Clarity assessment correct
- No unnecessary brainstorming
- Direct PRD creation
- Time efficiency

---

### Test 3: Moderate Clarity Suggests Brainstorming

**Input:**
```
"Build a dashboard for users"
```

**Expected Flow:**
1. ✅ Detect moderate clarity (specific but could vary)
2. ✅ Suggest brainstorming with user choice
3. ✅ Present two options:
   - Direct PRD with assumptions
   - Brainstorm different dashboard types
4. ✅ Respect user decision
5. ✅ Execute chosen path

**Validation Points:**
- Appropriate suggestion
- User agency preserved
- Both paths functional
- Clear explanation of options

---

### Test 4: Emergency Bypasses Everything

**Input:**
```
"URGENT: Payment system is down and losing money!"
```

**Expected Flow:**
1. ✅ Detect emergency keywords
2. ✅ Skip ALL PM workflows
3. ✅ No brainstorming consideration
4. ✅ Direct debugging assistance
5. ✅ Focus on immediate fix

**Validation Points:**
- Emergency detection priority
- No PM overhead
- Immediate response
- Solution-focused

---

### Test 5: Educational Mode with Brainstorming

**Input:**
```
"I'm new to this, teach me how to plan a project"
```

**Expected Flow:**
1. ✅ Detect educational keywords
2. ✅ Activate learning mode
3. ✅ Explain brainstorming concept
4. ✅ Walk through simple example
5. ✅ Progressive complexity introduction
6. ✅ Show commands gradually

**Validation Points:**
- Educational mode activation
- Clear explanations
- Step-by-step guidance
- No overwhelming with commands

---

### Test 6: Brainstorming with Concept Import

**Input:**
```
"/pm:prd-new my-feature --with-concept .claude/ideas/2024-01-15/selected.md"
```

**Expected Flow:**
1. ✅ Detect concept import flag
2. ✅ Read existing brainstorming output
3. ✅ Extract key information
4. ✅ Create PRD with context
5. ✅ Link to original brainstorming

**Validation Points:**
- Concept file read correctly
- Information transferred to PRD
- Traceability maintained
- No duplicate brainstorming

---

### Test 7: Natural Language Command Translation

**Input Variations:**
```
1. "What should I do next?" → /pm:next
2. "Show me what's happening" → /pm:status  
3. "I have some ideas" → brainstorming-specialist
4. "Start working on issue 42" → /pm:issue-start 42
5. "Let's ship this" → /pm:epic-close
```

**Validation Points:**
- Each translation correct
- Natural feel maintained
- Commands shown (educational)
- Next steps suggested

---

### Test 8: Brainstorming Quality Gates

**Brainstorming Output Requirements:**
- ✅ Minimum 3 concepts generated
- ✅ Each concept has:
  - Technical feasibility score
  - Market opportunity assessment
  - Time to MVP estimate
  - Success probability
- ✅ Clear differentiation between concepts
- ✅ Actionable recommendation
- ✅ Structured documentation in .claude/ideas/

**Validation Points:**
- All required sections present
- Scores are realistic
- Recommendations logical
- Files created correctly

---

### Test 9: Progressive Complexity Scaling

**Simple Project Input:**
```
"Build a contact form"
```

**Expected:**
- Minimal PM ceremony
- Quick brainstorm (if any)
- Direct to implementation
- No complex decomposition

**Complex Project Input:**
```
"Build a multi-tenant SaaS platform with billing, analytics, and API"
```

**Expected:**
- Full brainstorming session
- Comprehensive PRD
- Detailed decomposition
- Parallel execution planning

**Validation Points:**
- Complexity assessed correctly
- Appropriate workflow selected
- Scaling smooth
- No over/under engineering

---

### Test 10: Error Recovery

**Failure Scenarios:**

1. **No viable concepts from brainstorming:**
   - Ask for more context
   - Suggest pivot
   - Offer direct PRD option

2. **User rejects all concepts:**
   - Offer to regenerate
   - Ask for specific direction
   - Allow custom concept input

3. **Concept file not found:**
   - Graceful degradation
   - Offer alternatives
   - Clear error message

**Validation Points:**
- Errors handled gracefully
- User not blocked
- Clear recovery paths
- State preserved

---

## Test Execution Commands

```bash
# Run individual test
/test brainstorming --scenario 1

# Run all brainstorming tests
/test brainstorming --all

# Run with verbose output
/test brainstorming --verbose

# Generate test report
/test brainstorming --report
```

## Success Criteria

### Quantitative Metrics
- Intent detection: >90% accuracy
- Brainstorming trigger: Correct in 95% of cases
- Command translation: 100% accurate
- Error recovery: 100% graceful

### Qualitative Metrics  
- Natural conversation feel
- Clear explanations
- Appropriate complexity
- User satisfaction

## Test Status

| Test | Status | Pass Rate | Notes |
|------|--------|-----------|-------|
| 1. Vague Input | ⏳ Pending | - | Ready to test |
| 2. Clear Requirements | ⏳ Pending | - | Ready to test |
| 3. Moderate Clarity | ⏳ Pending | - | Ready to test |
| 4. Emergency Bypass | ⏳ Pending | - | Ready to test |
| 5. Educational Mode | ⏳ Pending | - | Ready to test |
| 6. Concept Import | ⏳ Pending | - | Ready to test |
| 7. Natural Language | ⏳ Pending | - | Ready to test |
| 8. Quality Gates | ⏳ Pending | - | Ready to test |
| 9. Complexity Scaling | ⏳ Pending | - | Ready to test |
| 10. Error Recovery | ⏳ Pending | - | Ready to test |

---

*Last Updated: [Current Date]*
*Next Review: After Phase 1 Implementation*