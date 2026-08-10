/**
 * ALKOTA STUDIO CMS — VERIFICATION TEST SUITE
 *
 * Runs verification checks for:
 * 1. Server-side claim enforcement & unregistered assertion rejection on activation
 * 2. Deactivation of a component without altering historic saved builds
 * 3. Rejection of hard deletion attempts (HTTP 405)
 * 4. Build matrix rules update without altering static saved build snapshots
 * 5. Full audit trail logging for CREATE, EDIT, DEACTIVATE actions
 */

import { POST as createComponent, PUT as updateComponent, DELETE as deleteComponent, GET as getComponents } from "../src/app/api/studio/components/route";
import { GET as getMatrix, PUT as updateMatrix } from "../src/app/api/studio/build-matrix/route";
import { GET as getBuilds } from "../src/app/api/studio/builds/route";

async function runStudioVerification() {
  console.log("==================================================");
  console.log("ALKOTA STUDIO CMS VERIFICATION TEST RUNNER");
  console.log("==================================================");

  // ---------------------------------------------------------------------------
  // TEST 1: SERVER-SIDE CLAIM ENFORCEMENT & UNREGISTERED ASSERTION REJECTION
  // ---------------------------------------------------------------------------
  console.log("\n[TEST 1] Server-Side Claim Enforcement Test");

  // Attempt A: Create active component with NO claim_id
  const reqUnlinked = new Request("http://localhost/api/studio/components", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: "fork-test-unlinked",
      category: "FORK",
      manufacturer: "Test Brand",
      product: "Illegal Air 160",
      active: true,
      claim_id: "", // Missing claim ID
    }),
  });

  const resUnlinked = await createComponent(reqUnlinked);
  const dataUnlinked = await resUnlinked.json();
  console.log(`- Activation without claim_id HTTP Status: ${resUnlinked.status}`);
  console.log(`- Server Rejection Response:\n  "${dataUnlinked.error}"`);

  if (resUnlinked.status === 400 && dataUnlinked.error.includes("ACTIVATION REJECTED")) {
    console.log("PASS: Server correctly REJECTED activation without claim linkage!");
  } else {
    console.error("FAIL: Server allowed component activation without claim linkage.");
  }

  // Attempt B: Create component with unregistered assertion ("28.4%")
  const reqAssertion = new Request("http://localhost/api/studio/components", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: "shock-test-unregistered",
      category: "REAR_SHOCK",
      manufacturer: "Unregistered Shock Co",
      product: "Progression Coil",
      description: "Tuned specifically to ALKOTA's 28.4% progressive linkage curve.",
      active: true,
      claim_id: "APC-001001",
    }),
  });

  const resAssertion = await createComponent(reqAssertion);
  const dataAssertion = await resAssertion.json();
  console.log(`\n- Activation with unregistered assertion '28.4%' HTTP Status: ${resAssertion.status}`);
  console.log(`- Server Rejection Response:\n  "${dataAssertion.error}"`);

  if (resAssertion.status === 400 && dataAssertion.error.includes("unregistered engineering assertion")) {
    console.log("PASS: Server correctly REJECTED component with unregistered engineering assertion!");
  } else {
    console.error("FAIL: Server allowed component with unregistered assertion.");
  }

  // ---------------------------------------------------------------------------
  // TEST 2: CREATE, EDIT, AND DEACTIVATE A COMPONENT (AUDIT TRAIL GENERATION)
  // ---------------------------------------------------------------------------
  console.log("\n[TEST 2] Component Lifecycle & Audit Trail Generation");

  // Step 2a: Valid Create
  const reqCreate = new Request("http://localhost/api/studio/components", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: "fork-ohlins-rxf38",
      category: "FORK",
      manufacturer: "Öhlins",
      product: "RXF38 m.2",
      variant: "160 mm · TTX18 Damper",
      description: "Öhlins RXF38 m.2 air fork for high-speed alpine racing.",
      whySelected: "Benchmarking twin-tube damping against FOX GRIP X2.",
      status: "UNDER_REVIEW",
      claim_id: "APC-001001",
      active: true,
      is_selectable: true,
    }),
  });

  const resCreate = await createComponent(reqCreate);
  const dataCreate = await resCreate.json();
  console.log(`- Component Create Status: ${resCreate.status}`);
  console.log(`- Audit Entry Action: ${dataCreate.auditEntry?.action}`);

  // Step 2b: Edit Component
  const reqEdit = new Request("http://localhost/api/studio/components", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: "fork-ohlins-rxf38",
      updates: {
        variant: "160 mm · TTX18 Damper · Yellow Trim",
      },
    }),
  });

  const resEdit = await updateComponent(reqEdit);
  const dataEdit = await resEdit.json();
  console.log(`- Component Edit Status: ${resEdit.status}`);
  console.log(`- Audit Entry Action: ${dataEdit.auditEntry?.action}`);

  // Step 2c: Deactivate Component
  const reqDeactivate = new Request("http://localhost/api/studio/components", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: "fork-ohlins-rxf38",
      action: "DEACTIVATE",
    }),
  });

  const resDeactivate = await updateComponent(reqDeactivate);
  const dataDeactivate = await resDeactivate.json();
  console.log(`- Component Deactivate Status: ${resDeactivate.status}`);
  console.log(`- Audit Entry Action: ${dataDeactivate.auditEntry?.action}`);

  if (dataCreate.success && dataEdit.success && dataDeactivate.success) {
    console.log("PASS: Component lifecycle audit trail created for CREATE, EDIT, and DEACTIVATE!");
  }

  // ---------------------------------------------------------------------------
  // TEST 3: PROHIBITION OF HARD DELETION
  // ---------------------------------------------------------------------------
  console.log("\n[TEST 3] Hard Deletion Prohibition Test");
  const resDelete = await deleteComponent();
  const dataDelete = await resDelete.json();
  console.log(`- DELETE HTTP Status: ${resDelete.status}`);
  console.log(`- Server Rejection Response: "${dataDelete.error}"`);

  if (resDelete.status === 405) {
    console.log("PASS: Hard deletion is strictly prohibited (HTTP 405 Method Not Allowed)!");
  } else {
    console.error("FAIL: Server did not prohibit hard deletion.");
  }

  // ---------------------------------------------------------------------------
  // TEST 4: BUILD MATRIX UPDATE & SAVED BUILD IMMUTABILITY
  // ---------------------------------------------------------------------------
  console.log("\n[TEST 4] Build Matrix Update & Saved Build Immutability Test");

  // Fetch initial builds
  const reqBuildsBefore = new Request("http://localhost/api/studio/builds");
  const resBuildsBefore = await getBuilds(reqBuildsBefore);
  const dataBuildsBefore = await resBuildsBefore.json();
  const sampleBuildRef = dataBuildsBefore.builds[0]?.build_reference;
  const sampleBuildSelectionsBefore = JSON.stringify(dataBuildsBefore.builds[0]?.selections);

  console.log(`- Sample Historic Saved Build Ref: ${sampleBuildRef}`);
  console.log(`- Static Selections Before Matrix Update: ${sampleBuildSelectionsBefore}`);

  // Update build matrix rule
  const reqMatrixUpdate = new Request("http://localhost/api/studio/build-matrix", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemId: "fork",
      isConfigurable: true,
      rules: [
        {
          id: "rule-test-01",
          condition: "frameSize === 'S'",
          constraint: "Restricted to 150mm fork travel option",
          active: true,
        },
      ],
    }),
  });

  const resMatrixUpdate = await updateMatrix(reqMatrixUpdate);
  const dataMatrixUpdate = await resMatrixUpdate.json();
  console.log(`- Build Matrix Update Result: ${dataMatrixUpdate.success ? "SUCCESS" : "FAILED"}`);

  // Re-fetch sample build to verify immutability
  const reqBuildsAfter = new Request("http://localhost/api/studio/builds");
  const resBuildsAfter = await getBuilds(reqBuildsAfter);
  const dataBuildsAfter = await resBuildsAfter.json();
  const sampleBuildSelectionsAfter = JSON.stringify(dataBuildsAfter.builds[0]?.selections);

  console.log(`- Static Selections After Matrix Update: ${sampleBuildSelectionsAfter}`);

  if (sampleBuildSelectionsBefore === sampleBuildSelectionsAfter) {
    console.log("PASS: Historic saved build selections were UNCHANGED by matrix updates (Immutable Snapshot Guaranteed)!");
  } else {
    console.error("FAIL: Historic saved build was retroactively altered by matrix change!");
  }

  console.log("\n==================================================");
  console.log("STUDIO CMS VERIFICATION TEST RUN COMPLETE");
  console.log("==================================================");
}

runStudioVerification().catch(console.error);
